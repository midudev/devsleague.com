import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>devsleague.com - Competición de creadores de contenido de programación</title>
        <meta name="description" content="Donde programadores y creadores de contenido compiten" />
        <meta property="og:image" content="https://devsleague.com/img/og-image.jpg" />
        <meta property="twitter:image" content="https://devsleague.com/img/og-image.jpg" />
        <meta property="og:title" content="devsleague.com - Competición de creadores de contenido de programación" />
        <meta
          property="twitter:title"
          content="devsleague.com - Competición de creadores de contenido de programación"
        />
        <meta property="og:description" content="Donde programadores y creadores de contenido compiten" />
        <meta property="twitter:description" content="Donde programadores y creadores de contenido compiten" />
        <meta property="og:url" content="https://devsleague.com" />
        <meta property="twitter:url" content="https://devsleague.com" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
