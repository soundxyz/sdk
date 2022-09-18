import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  unstable_staticImage: true,
  unstable_flexsearch: {
    codeblock: false,
  },
})

export default withNextra({
  reactStrictMode: true,
})
