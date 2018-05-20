const path = require('path');
const _ = require('lodash');
const loadYaml = require('./loadYaml')

const adminConfig = loadYaml('./static/admin/config.yml')


const adjustImagePath = nodePath => image => {
  if (_.isString(image)) {
    if (image.indexOf(adminConfig.public_folder) === 0) {
      const nextImage = path.relative(
        path.dirname(nodePath),
        path.join(
          __dirname,
          adminConfig.media_folder,
          image.substr(adminConfig.public_folder.length)
        )
      )
      console.log('Adjusted image path', nextImage)
      return nextImage
    }
  }
  return image
}

exports.onCreateNode = ({
  node,
  getNode,
  loadNodeContent,
  boundActionCreators,
}) => {
  const { frontmatter } = node
  if (frontmatter) {
    const adjust = adjustImagePath(node.fileAbsolutePath)

    const { image } = frontmatter
    if (image) {
      node.frontmatter.image = adjust(image)
    }

    const { images } = frontmatter
    if (images) {
      images.forEach(obj => {
        obj.image = adjust(obj.image)
      })
    }

    const { carousel } = frontmatter
    if (carousel) {
      carousel.forEach(obj => {
        obj.image = adjust(obj.image)
      })
    }

    const { teamMembers } = frontmatter
    if (teamMembers) {
      teamMembers.forEach(obj => {
        obj.image = adjust(obj.image)
      })
    }
  }
}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            html
            id
            frontmatter {
              templateKey
              path
              date
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors);
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: path.resolve(`src/templates/${String(node.frontmatter.templateKey)}.js`),
        context: {} // additional data can be passed via context
      });
    });
  });
};


// With dataKind:

// allMarkdownRemark(
//   sort: { order: DESC, fields: [frontmatter___date] },
//   filter: { frontmatter: { dataKind: { eq:null} }}
// ) {
//   edges {
//     node {
//       excerpt(pruneLength: 400)
//       html
//       id
//       frontmatter {
//         dataKind
//         templateKey
//         path
//         date
//         title
//       }
//     }
//   }
// }
// }
