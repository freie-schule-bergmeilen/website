import React from 'react';
import Helmet from 'react-helmet';
import PhotoGallery from '../components/PhotoGallery'
import Img from 'gatsby-image'


const renderImage = (props) => {
  const {
    photo: { width, height, originalSizes },
    margin,
    onClick,
  } = props
  return (
    <div
      style={{
        width,
        height,
        float: 'left',
        margin,
        cursor: 'pointer'
      }}
      onClick={(evt) => onClick(evt, props)}
    >
      <Img sizes={originalSizes} />
    </div>
  )
}

export default function Template({ data }) {
  const { markdownRemark: post } = data;
  return (
    <section className="section">
      <Helmet title={`${post.frontmatter.title}`} />
      <div className="content">
        <h1 className="title is-size-3 is-bold-light">
          {post.frontmatter.title}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <div>
          <PhotoGallery
            renderImage={renderImage}
            photos={
              post.frontmatter.images
                .filter(({ image }) => image != null)
                .map(({  image: { childImageSharp: { sizes }}}) => {
                const { aspectRatio, src, srcSet } = sizes
                return {
                  width: aspectRatio, height: 1, src,
                  srcSet: srcSet.split(","),
                  sizes: [sizes.sizes],
                  originalSizes: sizes,
                }
              })
            }
          />
        </div>
      </div>
    </section>
  );
}

export const pageQuery = graphql`
  query GalleryByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        images {
          image {
            childImageSharp {
             sizes(maxWidth: 700, quality: 95) {
               ...GatsbyImageSharpSizes
             }
            }
          }
        }
      }
    }
  }
`;
