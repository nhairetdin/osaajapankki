import React, { Component } from 'react'
import { ButtonToolbar, Button, Icon } from 'rsuite'
import 'rsuite/dist/styles/rsuite.min.css'

import * as auth from './firebase/auth'

class Login extends Component {

  loginGoogle = () => {
    auth.signUpWithGoogle()
  }

  render() {
    return (
      <ButtonToolbar vertical="true">
        <Button color="blue" >
          <Icon icon="facebook-official"  /> Login with Facebook
        </Button>
        <Button color="green" onClick={ this.loginGoogle }>
          <Icon icon="google"  /> Login with Google
        </Button>
      </ButtonToolbar>
    )
  }
}

export default Login