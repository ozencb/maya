import React, { ReactElement } from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class Document extends NextDocument {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="A fullstack boilerplate" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <div id="overlays" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
