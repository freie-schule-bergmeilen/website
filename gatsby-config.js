const loadYaml = require('./loadYaml')

const siteMetadata = loadYaml('./data/site-metadata.yml')
const { trackingId } = siteMetadata

module.exports = {
  siteMetadata: {
    ...siteMetadata,
    goals: loadYaml('./data/goals.yml'),
    hero: loadYaml('./data/hero.yml'),
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-glamor',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img/carousel`,
        name: 'carousel-images'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img/`,
        name: 'images'
      }
    },
    // This plugin exposes helper functions for processing
    // images with the NPM package “sharp”. It's used by
    // several other plugins.
    'gatsby-plugin-sharp',
    // This plugin identifies file nodes that are images and
    // transforms these to create new “ImageSharp” nodes.
    // With them you can resize images and
    // generate responsive image thumbnails.
    'gatsby-transformer-sharp',



    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false
            }
          },
         'gatsby-remark-copy-linked-files',  // for e.g. PDF inclusion
        ]
      }
    },
    // {
    //   resolve: 'gatsby-plugin-google-analytics',
    //   options: {
    //     trackingId,
    //     anonymize: true,
    //   },
    // },

    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: '#076CAD',
        showSpinner: false,
      },
    },
  ]
};
