import React, { Component } from 'react'
import {
  ButtonToolbar,
  Button,
  Container,
  Content,
  ControlLabel,
  FlexboxGrid,
  Form,
  FormControl,
  FormGroup,
  Footer,
  Header,
  Panel,
  Navbar,
  Icon
} from 'rsuite'
import RegisterModal from './RegisterModal'
import 'rsuite/dist/styles/rsuite.min.css'
import './Login.css'
import './NavbarTop.css'

import * as auth from './firebase/auth'

class Login extends Component {
  state = {
    formValue: {
      email: '',
      password: ''
    },
    showRegisterModal: false
  }

  loginGoogle = () => {
    auth.signUpWithGoogle()
  }

  loginAsAdmin = () => {
    auth.signUpWithEmailAndPassword('admin@test.fi', 'admin1')
  }

  openModal = () => {
    this.setState({ showRegisterModal: true })
  }

  closeModal = () => {
    this.setState({ showRegisterModal: false })
  }

  handleChange = (value) => {
    this.setState({ formValue: value })
  }

  login = () => {
    auth.signUpWithEmailAndPassword(this.state.formValue.email, this.state.formValue.password)
  }

  render() {
    return (
      <Container>
        <RegisterModal show={ this.state.showRegisterModal } onHide={ this.closeModal }/>

        <Header>
          <Navbar appearance="inverse" classPrefix="worksans">
            <Navbar.Header>
              <a className="navbar-brand logo">OSAAJAPANKKI</a>
            </Navbar.Header>
          </Navbar>
        </Header>

        <Content>
          <FlexboxGrid justify="center" align="middle">
            <FlexboxGrid.Item colspan={10}>
              <Panel header={<h3>Kirjaudu sisään</h3>} bordered>
                <Form fluid onChange={ this.handleChange } formValue={ this.state.formValue }>
                  <FormGroup>
                    <Button color="green" onClick={this.loginGoogle} block>
                      <Icon icon="google" /> Google tunnuksilla
                    </Button>
                  </FormGroup>

                  <FormGroup>
                    <p>Tai omalla tunnuksella:</p>
                  </FormGroup>

                  <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl name="email" />
                  </FormGroup>

                  <FormGroup>
                    <ControlLabel>Salasana</ControlLabel>
                    <FormControl name="password" type="password" />
                  </FormGroup>

                  <FormGroup>
                    <ButtonToolbar>
                      <Button appearance="primary" onClick={ this.login }>Kirjaudu</Button>
                      <Button appearance="link">Unohtunut salasana?</Button>
                      <Button appearance="link" onClick={ this.openModal }>Luo tunnus</Button>
                    </ButtonToolbar>
                  </FormGroup>
                </Form>
              </Panel>
              <br></br>
              <Button color="red" onClick={this.loginAsAdmin} appearance="ghost">
                Login as admin (Development feature)
              </Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    )
  }
}

export default Login
