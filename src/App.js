import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css'
import * as auth from './firebase/auth'
import { firebase } from './firebase/firebase'
import { getPersonalData } from './firebase/db'
import Login from './Login'
import AddUser from './AddUser'
import Search from './Search'
import NavbarTop from './NavbarTop'
import { Loader, Container, Header, Content } from 'rsuite'
import { setStatePersonalData, toggleLoading, setStateLogoutUser } from './redux/reducer'

class App extends Component {
  async componentDidMount() {
    // if (firebase.auth().currentUser.email) {
    //   console.log("user already in")
    //   this.props.toggleLoading()
    // }
    firebase.auth().onAuthStateChanged(async authUser => {
      console.log("auth state changed")
      if (authUser) {
        console.log("user is logged in")
        let personalData = await getPersonalData()
        this.props.setStatePersonalData(personalData)
        console.log(personalData)
        // if (personalData) {
        //   this.props.userLoggedIn()
        // }
      } else {
        this.props.setStateLogoutUser()
      }
    })
  }

  render() {
    let content = null
    if (this.props.loading) {
      // render loading animation
      content = (<Loader size="lg" content="Hetki..." />)
    } else if (!this.props.user) {
      // render login screen
      content = (<Login />)
    } else if(this.props.user.flag_authorized !== true) {
      content = (<h2>Ei oikeuksia.</h2>)
    } else {
      // render UI
      content = (
        <Router>
          <Container>
            <Header>
              <NavbarTop />
            </Header>

            <Content>
              <Route exact path="/haku" render={() => <Search />} />
              <Route exact path="/lisaa" render={() => <AddUser />} />
            </Content>
          </Container>
        </Router>
      )
    }
    return (
      content
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    loading: state.loading
  }
}

export default connect(
  mapStateToProps,
  { setStatePersonalData, toggleLoading, setStateLogoutUser }
)(App)
