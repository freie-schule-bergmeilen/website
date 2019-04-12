import React from 'react'
import Helmet from 'react-helmet'
import GoalsList from '../components/GoalsList'



export default (
  {
    data: {
      site: { siteMetadata: { goals } }
    }
  }) =>
  <section className="section">
    <Helmet>
      <title>{goals.title}</title>
    </Helmet>
    <h2 className="title is-size-3">{goals.title}</h2>
    <div className="content">
      <GoalsList goals={goals.goals} expand={true} />
    </div>
  </section>


export const eventsFragment = graphql`
  fragment goals on RootQueryType {
    site {
      siteMetadata {
        goals {
          title
          goals {
            title
          }
        }
      }
    }
  }
`

export const pageQuery = graphql`
  query GoalsPageQuery {
    ...goals
  }
`;
