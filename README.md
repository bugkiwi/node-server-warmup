### node-server-warmup
Warmup a node server before start, support `express`、`koa`、`fastify`、`http`.

### Pure http server;
```javascript
const {warmup} = require('node-server-warmup');
const http = require('http');

(async () => {
    let count = 0;
    const handler = (_, resp) => {
        count += 1;
        resp.end(JSON.stringify({count}));
    };
    await warmup(handler, {path: '/warmup'});
    http.createServer(handler).listen(3000, () => {
        console.info('Start on http://127.0.0.1:3000');
    });
    console.info({count}); // {count: 1};
})();
```

### Warmup Express
```javascript
const {warmup} = require('node-server-warmup');
const Express = require('express');

(async () => {
    let count = 0;
    app = Express();
    app.get('/warmup', (_, res) => {
        count += 1;
        res.send(JSON.stringify({count}));
    });

    await warmup(app, {path: '/warmup'});

    app.listen(3000, () => {
        console.info('Start on http://127.0.0.1:3000');
    });
    console.info({count}); // {count: 1};
})()
```
