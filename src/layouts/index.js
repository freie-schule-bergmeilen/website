import React from 'react';
import Nav from '../components/Nav'
import Helmet from 'react-helmet';
import '../styles/styles.scss'
import Carousel from '../components/Carousel'


export default (
  {
    children,
    data: {
      site: { siteMetadata: { title, hero, meta } },
      carouselImages,
      heroRemark,
      pages
    },
    ...props
  }) => (

  <div>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={ meta.description } />
      <meta name="keywords" content={ meta.keywords } />
    </Helmet>

    <div className="container">
      <Nav
        title={title}
        pages={pages.edges.map(
          ({ node: { frontmatter }}) => frontmatter
        )}
      />
    </div>

    <section className="hero is-info is-bold">
      <div className="hero-body">
        <div className="container">
        { props.location.pathname === '/' &&
          <Carousel images={carouselImages.edges}/>
        }
        </div>
        {props.location.pathname === '/' &&
        <div className="container">
          <section className="section">
            <h1 className="title">{hero.title}</h1>
            <div className="content">{hero.text}</div>
          </section>
        </div>
        }
      </div>
    </section>


    <div className="container">{children()}</div>

    <footer className="footer">
      <div className="container">
        <section className="section">
            &copy; { new Date().getFullYear() } Freie Schule Bergmeilen
        </section>
      </div>
    </footer>


  </div>
)


export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        meta {
          keywords
          description
        }
        hero {
          title
          text
        }
      }
    }
    
    pages: allMarkdownRemark(
      filter: { 
        id: { regex: "/pages/"},
        frontmatter: {kind: {eq: "page"}}
      },
      sort: {order: ASC, fields: [frontmatter___order]}                                  
    ) {
      edges {
        node {
          frontmatter {
            path
            title
            section
          }
        }
      }
    }

    carouselImages: allImageSharp(filter: { id:{ regex: "/carousel/"}}) {
      edges {
        node {
          ... on ImageSharp {
            sizes(maxHeight:350, quality: 90, cropFocus: ENTROPY) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`

