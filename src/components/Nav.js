import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link';
//import logo from '../img/logo.svg';
import './nav.scss'
import { css } from 'glamor'
import { window } from 'global'
import isEmpty from 'lodash/isEmpty'

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
    menu: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }))
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
    if(typeof window !== 'undefined') {
      if (window.netlifyIdentity) {
        if (window.netlifyIdentity.currentUser()) {
          document.location.href = "/admin/"
        } else {
          window.netlifyIdentity.open()
        }
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
    const { menu } = this.props

    const NavLink = ({ to, text }) =>
      <Link
        activeClassName="is-active"
        className="navbar-item"
        to={to}
        onClick={this.handleLinkClick}
      >
        {text}
      </Link>

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
            { menu.map(section => (
              <div
                key={section.title}
                className="navbar-item has-dropdown is-hoverable"
              >
                <div className="navbar-link">{section.title}</div>
                {!isEmpty(section.items) &&
                <div className="navbar-dropdown">
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


            <div style={{ display: 'flex', marginLeft: 25 }}>
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
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
