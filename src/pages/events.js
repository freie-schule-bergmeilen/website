import React from 'react'
import EventsList from '../components/EventsList'
import Helmet from 'react-helmet';


export default (
  {
    data: {
      eventsRemarks: {
        edges: eventNodes
      },
    }
  }) => {

  const now = new Date()
  const future = eventNodes.filter(d =>
    new Date(d.node.frontmatter.date) >= now
  )
  const past = eventNodes.filter(d =>
    new Date(d.node.frontmatter.date) < now
  ).reverse()

  return (
    <section className="section">
      <Helmet>
        <title>Veranstaltungen</title>
      </Helmet>
      <h2 className="title is-size-3 is-bold-light">Aktuelle Veranstaltungen</h2>
      <div>
        <EventsList events={future}/>
      </div>

      <br/><br/>

      <h2 className="title is-size-3 is-bold-light">Frühere Veranstaltungen</h2>
      <div>
        <EventsList events={past}/>
      </div>
    </section>
  )
}




export const eventsFragment = graphql`
  fragment events on RootQueryType {
    eventsRemarks: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___date] },
      filter:{ frontmatter: { templateKey: { eq:"event" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            templateKey
            date
            path
          }
        }
      }
    }
  }
`



export const pageQuery = graphql`
  query EventsPageQuery {
    ...events  
  }
`;
