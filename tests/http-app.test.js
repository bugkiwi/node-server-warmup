const http = require('http');
const {warmup, fetch} = require('../src/index.ts');

let count, handler, server;
beforeEach(async () => {
  count = 0;
  handler = (req, resp) => {
    count += 1;
    resp.end(JSON.stringify({count}));
  };
});
afterEach(async () => {
  server && server.close();
})

describe('Test pure http warmup', () => {
  it('normal warmup', async () => {
    await warmup(handler, {path: '/warmup', method: 'POST'});

    server = http.createServer(handler).listen(3000);
    const result = JSON.parse((await fetch('http://127.0.0.1:3000/warmup')).toString());
    expect(result.count).toBe(2);
  });

  it('custom warmup function', async () => {
    await warmup(handler, async (server) => {
      const req = new http.IncomingMessage(server.socket);
      handler(undefined, new http.ServerResponse(req));
    });

    server = http.createServer(handler).listen(3000);
    const result = JSON.parse((await fetch('http://127.0.0.1:3000/warmup')).toString());
    expect(result.count).toBe(2);
  });

  it('empty warmup', async () => {
    await warmup(handler, {});
    server = http.createServer(handler).listen(3000);
    const result = JSON.parse((await fetch('http://127.0.0.1:3000/warmup')).toString());
    expect(result.count).toBe(2);
  });

})

