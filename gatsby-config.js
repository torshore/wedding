/* eslint-disable no-undef */

require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

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
