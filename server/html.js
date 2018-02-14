import React, { Component } from 'react';

export default class Html extends Component {
  render() {
    const {
      children,
      chunkName,
      initData,
    } = this.props;

    return (
      <html lang="en">
        <head>
          <link rel="stylesheet" href="/assets/style.css" />
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <script dangerouslySetInnerHTML={{
            __html: `window.__initState__=${JSON.stringify(initData)}`,
          }}
          />
          <script src="/assets/vendor.js" />
          <script src={`/assets/${chunkName}.chunk.js`} />
          <script src="/assets/client.js" />
        </body>
      </html>
    );
  }
}
