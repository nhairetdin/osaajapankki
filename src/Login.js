import React, { Component } from 'react'
import { ButtonToolbar, Button, Icon } from 'rsuite'
import 'rsuite/dist/styles/rsuite.min.css'

import * as auth from './firebase/auth'

class Login extends Component {

  loginGoogle = () => {
    auth.signUpWithGoogle()
  }

  loginAsAdmin = () => {
    auth.signUpWithEmailAndPassword('admin@test.fi', 'admin1')
  }

  render() {
    return (
      <ButtonToolbar vertical="true">
        <Button color="blue" >
          Login with Facebook
        </Button>
        <Button color="green" onClick={ this.loginGoogle }>
          Login with Google
        </Button>
        <Button color="red" onClick={ this.loginAsAdmin }>Login as admin</Button>
      </ButtonToolbar>
    )
  }
}

export default Login