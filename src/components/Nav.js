import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link';
//import logo from '../img/logo.svg';
import './nav.scss'
import _ from 'lodash'
import { css } from 'glamor'
import { window } from 'global'

const styles = {
  brand: css({
    paddingLeft: 35,
    // paddingLeft: 65,
    // backgroundImage: `url(${logo})`,
    // backgroundRepeat: 'no-repeat',
    // backgroundPositionX: 10,
    height: 64,
    '& > .title': {
      height: 64,
      display: 'flex',
      alignItems: 'center',
    },
    '@media screen and (max-width: 500px)': {
      '& > h1.title': {
        fontSize: '1.6rem !important',
      }
    },
    '@media screen and (max-width: 380px)': {
      '& > h1.title': {
        fontSize: '1.5rem !important',
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

  // handleClickAdmin = () => {
  //   if(typeof window !== 'undefined') {
  //     if (window.netlifyIdentity) {
  //       if (window.netlifyIdentity.currentUser()) {
  //         document.location.href = "/admin/"
  //       } else {
  //         window.netlifyIdentity.open()
  //       }
  //     }
  //   }
  // }

  renderBrand() {
    const { isBurgerActive } = this.state
    const { title } = this.props
    return (
      <div
        className="navbar-brand"
      >
        <Link to="/">
          <div {...styles.brand}>
            <h1 className="title">{title}</h1>
          </div>
        </Link>

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
      <nav className="navbar">
        { this.renderBrand() }

        <div
          className={
            `navbar-menu
            ${isBurgerActive && 'is-active'}`
          }
        >
          <div className="navbar-end">

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
                <NavLink to="/reservation" text="Platzreservation"/>
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">
                Philosophie
              </div>
              <div className="navbar-dropdown">
                <NavLink to="/goals" text="Unsere Leitgedanken"/>
                {renderAddedPages('Philosophie')}
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">
                Über uns
              </div>
              <div className="navbar-dropdown">
                <NavLink to="/gallery" text="Fotos"/>
                <NavLink to="/team" text="Team"/>
                {renderAddedPages('Über uns')}
              </div>
            </div>

            <a
              className="navbar-item"
              href="/admin/"
            >
              <span className="icon">
                <i className="fa fa-lg fa-lock"
                  style={{ position: 'relative', top: 1, }}
                />
              </span>
            </a>
            <a className="navbar-item" href="https://forum.freie-schule-bergmeilen.ch/" target="_blank" rel="noopener">
              <span className="icon">
                <i className="fa fa-lg fa-comments"/>
              </span>
            </a>
            <a className="navbar-item" href="https://www.facebook.com/Freie-Schule-Bergmeilen-502505593264330/" target="_blank" rel="noopener">
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
