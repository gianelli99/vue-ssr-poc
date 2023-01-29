import express from 'express';
import { renderToString } from 'vue/server-renderer';
import { createApp } from './app.js';

const server = express();

server.get('/', (req, res) => {
  const app = createApp();

  const context = {
    user: {
      name: 'Gianfranco Elli',
      loginUrl: 'https://google.com',
    },
    path: req.headers,
  };
  renderToString(app, context).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
        <script>window.context =${JSON.stringify(context)}</script>
        <script async src="https://ga.jspm.io/npm:es-module-shims@1.6.3/dist/es-module-shims.js"></script>
        <script type="importmap">
        {
          "imports": {
            "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
          }
        }
        </script>
        <script type="module" src="/client.js"></script>
      </head>
      <body>
        <div id="app">${html}</div>
    </html>
    `);
  });
});

server.use(express.static('.'));

server.listen(3000, () => {
  console.log('ready');
});
