import React from 'react'
import _ from 'lodash'
import { css } from 'glamor'
import EventsList from '../components/EventsList'
import GoalsList from '../components/GoalsList'
import Link from 'gatsby-link'


const styles = {
  columns: css({
    display: 'flex',
    '@media screen and (max-width: 768px)': {
      flexDirection: 'column',
    }
  }),
  aktuelles: css({
    '@media screen and (max-width: 768px)': {
      order: -1
    }
  })
}



const EventsColumn = ({ eventsRemarks, numItemsToShow }) => {
  if (_.isEmpty(eventsRemarks)) {
    return null
  }
  const { edges: eventsEntries } = eventsRemarks
  const events =
    _.take(
      eventsEntries.filter(({ node }) => new Date(node.frontmatter.date) >= new Date())
    , numItemsToShow
  )
  if (_.isEmpty(events)) {
    return null
  }
  return (
    <div
      className="column"
      {...styles.aktuelles}
    >
      <h2 className="title"><Link to="/events">Veranstaltungen</Link></h2>
      <EventsList events={events}/>
    </div>
  )
}


export default (
  {
    data: {
      eventsRemarks,
      site: { siteMetadata: { goals, numEvents } }
    }
  }) =>
  <section className="section">
    <div
      className="columns"
      {...styles.columns}
    >
      <div className="column">
        <h2 className="title">{goals.title}</h2>
        <div className="content">
          <GoalsList {...goals} />
        </div>
      </div>

      <EventsColumn
        eventsRemarks={eventsRemarks}
        numItemsToShow={numEvents}
      />
    </div>
  </section>




export const pageQuery = graphql`
  query IndexQuery {
  
    ...events  

    site {
      siteMetadata {
        goals {
          title
          goals {
            title
          }
        }
        numEvents
      }
    }
  }
`;
