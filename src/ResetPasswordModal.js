import React, { Component } from 'react'
import { Modal, Button, Form, FormGroup, ControlLabel, FormControl, Notification } from 'rsuite'
import * as auth from './firebase/auth'

class ResetPasswordModal extends Component {
  state = {
    formValue: {
      email: ''
    }
  }

  handleChange = (value) => {
    this.setState({ formValue: value })
  }

  resetPassword = async () => {
    if (await auth.sendPasswordResetEmail(this.state.formValue.email)) {
      Notification['success']({
        title: 'Lähetettiin ohjeet salasanan uusimiseksi:',
        description: this.state.formValue.email
      })
      this.props.onHide()
    } else {
      Notification['error']({
        title: 'Virhe:',
        description: 'Virheellinen email'
      })
    }
  }

  render() {
    return (
      <Modal size="xs" show={ this.props.show } onHide={ this.props.onHide }>
        <Modal.Header>
          <Modal.Title>Salasanan uusiminen</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form fluid onChange={ this.handleChange } formValue={ this.state.email }>
            <FormGroup>
              <ControlLabel>Email:</ControlLabel>
              <FormControl name="email" />
            </FormGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this.resetPassword } appearance="primary" >
            Lähetä
          </Button>
          <Button onClick={ this.props.onHide } appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ResetPasswordModal