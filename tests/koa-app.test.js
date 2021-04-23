const Koa = require('koa');
const Router = require('@koa/router');
const {warmup, fetch} = require('../src/index.ts');

let count, app, router, server;
beforeEach(async () => {
  app = new Koa();
  router = new Router();
  count = 0;
  router.get('/warmup', (ctx, next) => {
    count += 1;
    ctx.body = {count};
  });
  app.use(router.routes());
});
afterEach(() => {
  server && server.close();
});

describe('Test Koa warmup', () => {
  it('normal warmup', async () => {
    await warmup(app, {path: '/warmup'});
    server = app.listen(3000);
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
      expect(e).toContain('just give a path like');
    });
  })
})


