import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Blogs</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content="Blogs app" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
