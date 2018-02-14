import { Readable } from 'stream';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

const App = () => <div>this is a test for renderToNodeStream/renderToStaticNodeStream</div>;

const bufPre = Buffer.from(
  `<!DOCTYPE html>
    <html lang="en">
      <body>
        <div id="app">`, 'utf-8');
const bufSuf = Buffer.from(
  `</div>
        <script src="/assets/index.js"></script>
      </body>
    </html>`, 'utf-8');

export default (isStatic = false) => {
  const s = new Readable();
  const render = isStatic
    ?
    ReactDOMServer.renderToStaticNodeStream
    :
    ReactDOMServer.renderToNodeStream;
  const rs = render(<App />);
  s.push(bufPre);
  // eslint-disable-next-line 
  s._read = function () {
    const buf = rs.read();
    if (buf) {
      this.push(buf);
    } else {
      this.push(bufSuf);
      this.push(null);
    }
  };
  return s;
};

