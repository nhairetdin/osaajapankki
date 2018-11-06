import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as auth from './firebase/auth'
import 'rsuite/dist/styles/rsuite.min.css'
import { Navbar, Nav, Icon, Button } from 'rsuite'
import './NavbarTop.css'
import { connect } from 'react-redux'
import { setActiveTab } from './redux/reducer'

class NavbarTop extends Component {
  onSelect = (eventKey) => {
    this.props.setActiveTab(eventKey)
  }

  render() {
    return (
      <Navbar appereance="inverse" classPrefix="worksans">
        <Navbar.Header>
          <a href="/" className="navbar-brand logo">OSAAJAPANKKI</a>
        </Navbar.Header>

        <Navbar.Body>
          <Nav onSelect={ this.onSelect } activeKey={ this.props.activeTab }>
            <Nav.Item 
              eventKey="1" 
              icon={<Icon icon="search-peoples" />} 
              componentClass={Link}
              to={'/haku'}>
              HAKU
            </Nav.Item>

            <Nav.Item 
              eventKey="2" 
              icon={<Icon icon="plus-circle" />} 
              componentClass={Link}
              to={'/lisaa'}>
              LISÄÄ TAITEILIJAOHJAAJA
            </Nav.Item>
          </Nav>

          <Nav pullRight>
            <Nav.Item active="false">
              { this.props.user.email }
            </Nav.Item>
            <Button
              className="buttonLogout"
              appearance="primary"
              color="red"
              size="md"
              onClick={ () => {
                auth.signOut()
              }}>
              Kirjaudu ulos
            </Button>
          </Nav>
        </Navbar.Body>
      </Navbar>
    )
  }
}

const mapStateToProps = state => {
  return {
    activeTab: state.activeTab,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { setActiveTab }
)(NavbarTop)