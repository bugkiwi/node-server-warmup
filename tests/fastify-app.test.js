/**
 * @file
 * @author gkiwi
 * @refers https://github.com/fastify/fastify/issues/2411 - can't reopen fastify on new port;
 */

const Fastify = require('fastify');
const {fetch, warmup} = require('../src/index.ts');

let count, app, server;
beforeEach(async () => {
    count = 0;
    app = new Fastify();
    app.get('/warmup', () => {
        count += 1;
        return {count};
    });
});
afterEach(async () => {
    server && (await server.close());
});

describe('Test fastify warmup', () => {
    it('normal warmup', async () => {
        await warmup(app, {url: '/warmup'});
        await app.listen(3000);
        server = app.server;
        const result = JSON.parse((await fetch('http://127.0.0.1:3000/warmup')).toString());
        expect(result.count).toBe(2);
    });

    it('wrong warmup: not exit path;', async () => {
        return warmup(app, {url: '/not-exit-path'}).catch(e => {
            expect(e).toContain('not-exit-path');
        });
    });

    it('custom warmup function', async () => {
        await warmup(app, async () => {
            await app.inject({url: '/warmup'});
        });

        await app.listen(3000);
        server = app.server;
        const result = JSON.parse((await fetch('http://127.0.0.1:3000/warmup')).toString());
        expect(result.count).toBe(2);
    });
});
