const express = require('express');
const {fetch, warmup} = require('../src/index.ts');

let count, app, server;
beforeEach(async () => {
    count = 0;
    app = express();
    app.get('/warmup', (req, res) => {
        count += 1;
        res.send(JSON.stringify({count}));
    });
});
afterEach(() => {
    server && server.close();
});

describe('Test Express warmup', () => {
    it('normal warmup', async () => {
        await warmup(app, {path: '/warmup'});
        server = await app.listen(3000);
        const result = JSON.parse((await fetch('http://127.0.0.1:3000/warmup')).toString());
        expect(result.count).toBe(2);
    });

    it('wrong warmup: not exit path;', async () => {
        return warmup(app, {path: '/not-exit-path'}).catch(e => {
            expect(e).toContain('not-exit-path');
        });
    });

    it('wrong warmup: wrong path', async () => {
        return warmup(app, {path: 'http://192.168.0.1/warmup'}).catch(e => {
            expect(e.message).toContain('just give a path like');
        });
    });
});
