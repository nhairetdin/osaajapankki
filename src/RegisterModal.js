import React, { Component } from 'react'
import { Modal, Button, Form, FormGroup, ControlLabel, FormControl, Notification } from 'rsuite'
import * as auth from './firebase/auth'

class RegisterModal extends Component {
  state = {
    formValue: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    isFormValid: false
  }

  close = () => {
    console.log("closing..")
  }

  handleChange = (value) => {
    this.setState({ formValue: value }, () => {
      if (this.isPasswordValid() && this.state.formValue.email !== '') {
        this.setState({ isFormValid: true })
      } else {
        this.setState({ isFormValid: false })
      }
    })
  }

  isPasswordValid = () => {
    const a = this.state.formValue.password
    const b = this.state.formValue.confirmPassword
    if (a.length < 7 || b.length < 7 || a !== b) {
      return false
    } else {
      return true
    }
  }

  createUser = async () => {
    const msg = await auth.createUserWithEmailAndPassword(this.state.formValue.email, this.state.formValue.password)
    if (msg) {
      Notification['error']({
        title: 'Virhe:',
        description: msg
      })
    }
  }

  render() {
    return (
      <Modal size="xs" show={ this.props.show } onHide={ this.props.onHide }>
        <Modal.Header>
          <Modal.Title>Uusi käyttäjä</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form fluid onChange={ this.handleChange } formValue={ this.state.formValue }>
            <FormGroup>
              <ControlLabel>Email:</ControlLabel>
              <FormControl name="email" />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Salasana:</ControlLabel>
              <FormControl name="password" type="password" />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Vahvista salasana:</ControlLabel>
              <FormControl name="confirmPassword" type="password" />
            </FormGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this.createUser } appearance="primary" disabled={ !this.state.isFormValid }>
            Luo tunnus
          </Button>
          <Button onClick={ this.props.onHide } appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default RegisterModal