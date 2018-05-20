import React from 'react'
import Link from 'gatsby-link'

const NotFoundPage = () => (
  <section className="section">
    <div className="container">
      <h2 className="title">Oh nein…</h2>
      <p>
        Diese Seite haben wir leider nicht gefunden.
        Vielleicht wurde sie inzwischen gelöscht oder umbenannt.
      </p>
      <br/>
      <p>
        Schauen Sie doch <Link to="/">unsere Homepage</Link> an.
      </p>
    </div>
  </section>
)

export default NotFoundPage
