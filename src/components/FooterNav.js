import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link';
import './nav.scss'
import { window } from 'global'
import isEmpty from 'lodash/isEmpty'

export default class FooterNav extends PureComponent {

  static propTypes = {
    menu: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }))
    }))
  }

  render() {
    const { menu } = this.props

    const NavLink = ({ to, text }) =>
      <Link
        activeClassName="is-active"
        className=""
        to={to}
      >
        {text}
      </Link>

    return (
      <div className="columns">

        { menu.map((section, i) => (
          <div
            key={section.title}
            className="column"
          >
            <div style={{
              marginBottom: '.5em',
              fontWeight: 'bold',
            }}>{section.title}</div>
            {!isEmpty(section.items) &&
            <div style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              {section.items.map(item =>
                <NavLink
                  key={item.path}
                  to={item.path}
                  text={item.title}
                />
              )}
            </div>}
          </div>
        ))}
      </div>
    )
  }
}
