import express from 'express'
import childProcess from 'child_process'
const app = express()
import { renderToString } from 'react-dom/server'
import Home from '@/pages/Home'
const content = renderToString(<Home />);

app.get("*", (req, res) => {
    res.send(`
    <html
      <body>
        <div>${content}</div>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
    console.log("ssr-server listen on http://0.0.0.0:3000");
});

childProcess.exec("start http://0.0.0.0:3000");