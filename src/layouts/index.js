import React from 'react';
import Nav from '../components/Nav'
import Helmet from 'react-helmet';
import '../styles/styles.scss'
import Carousel from '../components/Carousel'
import Link from 'gatsby-link'


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

    <footer className="footer" style={{ padding: 0 }}>
      <div className="container">
        <section className="section">
          <div className="columns">

            <div className="column is-6">
              <small>
              &copy; { new Date().getFullYear() } Freie Schule Bergmeilen
              </small>
            </div>

            <div className="column is-3">
              <h4>E-Mail</h4>
              <small>
              <a href="mailto:fsbergmeilen@gmx.net">fsbergmeilen@gmx.net</a>
              </small>
            </div>
            <div className="column is-3">
              <h4>Kontaktadresse</h4>
              <small>
              Freie Schule Bergmeilen<br/>
              Toggwilerstrasse 154<br/>
              8706 Meilen<br/>
              </small>
            </div>
          </div>
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
            sizes(maxHeight:320, quality: 90, cropFocus: CENTER) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`

