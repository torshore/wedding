/* eslint-disable no-undef */

module.exports = {
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-eslint',
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve('./src/components/PageLayout.jsx'),
      },
    },
  ]
}
