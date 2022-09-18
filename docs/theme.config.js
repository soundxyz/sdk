/* eslint sort-keys: error */
/**
 * @type {import('nextra-theme-docs').DocsThemeConfig}
 */
export default {
  banner: {
    key: 'Sound.xyz SDK',
    text: 'Sound.xyz SDK',
  },
  logo: 'Sound.xyz SDK',
  docsRepositoryBase: 'https://github.com/soundxyz/sdk/blob/main/docs',
  editLink: {
    text: 'Edit this page on GitHub',
  },
  head: () => (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="Sound.xyz SDK" />
      <meta name="og:description" content="Sound.xyz SDK" />
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:image" content="https://nextra.vercel.app/og.png" /> */}
      <meta name="twitter:site:domain" content="www.sound.xyz" />
      <meta name="twitter:url" content="https://www.sound.xyz" />
      <meta name="og:title" content="Sound.xyz SDK" />
      {/* <meta name="og:image" content="https://nextra.vercel.app/og.png" /> */}
      <meta name="apple-mobile-web-app-title" content="Sound.xyz SDK" />
      {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" /> */}
    </>
  ),
  chat: {
    link: 'https://discord.gg/soundxyz',
  },
  unstable_faviconGlyph: '✦',
}
