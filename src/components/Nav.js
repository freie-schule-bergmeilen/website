import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link';
import logo from '../img/logo.svg';
import './nav.scss'
import _ from 'lodash'
import { css } from 'glamor'

const styles = {
  nav: css({
    marginTop: 10,
    marginBottom: 10,
  }),
  navbarEnd: css({
    marginBottom: 5,
    marginTop: 5,
  }),
  brand: css({
    paddingLeft: 75,
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 10,
    backgroundSize: 'contain',
    height: 55,
    '& > h1.title': {
      height: 60,
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.9rem !important',
    },
    '@media screen and (max-width: 1200px)': {
      '& > h1.title': {
        fontSize: '1.75rem !important',
      }
    },
    '@media screen and (max-width: 500px)': {
      '& > h1.title': {
        fontSize: '1.6rem !important',
      }
    },
    '@media screen and (max-width: 380px)': {
      '& > h1.title': {
        fontSize: '1.4rem !important',
      }
    },
  })
}

export default class Nav extends PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    pages: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      section: PropTypes.string.isRequired,
    }))
  }

  state = {
    isBurgerActive: false
  }

  handleToggleBurger = () => {
    this.setState({
      isBurgerActive: !this.state.isBurgerActive
    })
  }

  handleLinkClick = () => {
    this.setState({
      isBurgerActive: false
    })
  }

  handleClickAdmin = () => {
    if (window.netlifyIdentity) {
      if (window.netlifyIdentity.currentUser()) {
        document.location.href = "/admin/"
      } else {
        window.netlifyIdentity.open()
      }
    }
  }

  renderBrand() {
    const { isBurgerActive } = this.state
    const { title } = this.props
    return (
      <div
        className="navbar-brand"
      >
        <a href="../">
          <div {...styles.brand}>
            <h1 className="title">{title}</h1>
          </div>
        </a>

        <div
          className={
            `navbar-burger burger
            ${isBurgerActive && 'is-active'}`
          }
          onClick={this.handleToggleBurger}
        >
          <span/>
          <span/>
          <span/>
        </div>
      </div>
    )
  }

  render() {
    const { isBurgerActive } = this.state
    const { pages } = this.props

    const pagesBySection = _.groupBy(pages, 'section')

    const NavLink = ({ to, text }) =>
      <Link
        activeClassName="is-active"
        className="navbar-item"
        to={to}
        onClick={this.handleLinkClick}
      >
        {text}
      </Link>

    const renderAddedPages = (section) =>
      (pagesBySection[section] || [])
        .map(({ title, path }) =>
          <NavLink key={path} to={path} text={title} />
        )


    return (
      <nav className="navbar" {...styles.nav}>
        { this.renderBrand() }

        <div
          className={
            `navbar-menu
            ${isBurgerActive && 'is-active'}`
          }
        >
          <div className="navbar-end" {...styles.navbarEnd}>

            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">
                Aktuelles
              </div>
              <div className="navbar-dropdown">
                <NavLink to="/events" text="Veranstaltungen"/>
              </div>
            </div>

            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">
                Angebot
              </div>
              <div className="navbar-dropdown">
                {renderAddedPages('Angebot')}
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">
                Philosophie
              </div>
              <div className="navbar-dropdown">
                <NavLink to="/goals" text="Unsere Ziele"/>
                {renderAddedPages('Philosophie')}
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">
                Über uns
              </div>
              <div className="navbar-dropdown">
                <NavLink to="/team" text="Team"/>
                {renderAddedPages('Über uns')}
              </div>
            </div>

            <a
              className="navbar-item"
              onClick={this.handleClickAdmin}
            >
              <span className="icon">
                <i className="fa fa-lg fa-lock"
                  style={{ position: 'relative', top: 1, }}
                />
              </span>
            </a>
            <a className="navbar-item" href="https://www.facebook.com/Freie-Schule-Bergmeilen-502505593264330/" target="_blank">
              <span className="icon">
                <i className="fa fa-lg fa-facebook-official"/>
              </span>
            </a>
          </div>
        </div>
      </nav>
    )
  }
}
