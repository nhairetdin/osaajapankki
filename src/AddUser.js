import React, { Component } from 'react'
import 'rsuite/dist/styles/rsuite.min.css'
import { addNewUserToDatabase } from './firebase/db'
import { connect } from 'react-redux'
import { setActiveTab } from './redux/reducer'
import ImageUploader from './ImageUploader'
import './AddUser.css'
import { 
  Container, 
  Input, 
  InputGroup, 
  FlexboxGrid, 
  Button, 
  SelectPicker,
  TagPicker,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
  ButtonToolbar,
  Notification,
  Divider } from 'rsuite'

class AddUser extends Component {
  state = {
    form: {
      email: "",
      name: "",
      city: "",
      address: "",
      phone: "",
      skill: "",
      profileImageUrl: ""
    }
  }

  componentWillMount = () => {
    console.log('Profile will mount')
    this.props.setActiveTab("2")
  }

  onProfileFormChange = (formObj) => {
    console.log(this.state.form)
    this.setState({ form: { ...this.state.form, ...formObj} })
  }

  onReturnProfileImageUrl = (url) => {
    console.log(url)
    this.setState({ form: { ...this.state.form, profileImageUrl: url } })
  }

  onSubmit = async () => {
    await addNewUserToDatabase(this.state.form)
  }

  render() {
    return (
      <div>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={18}>
            <Divider></Divider>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={9}>
            <Form fluid onChange={(obj) => this.onProfileFormChange(obj) }>
              <FormGroup>
                <ControlLabel>Sähköposti:</ControlLabel>
                <FormControl name="email" />
                <HelpBlock>Pakollinen tieto</HelpBlock>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Nimi:</ControlLabel>
                <FormControl name="name" />
                <HelpBlock>Pakollinen tieto</HelpBlock>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Kaupunki:</ControlLabel>
                <FormControl name="city" />
                <HelpBlock>Pakollinen tieto</HelpBlock>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Katuosoite:</ControlLabel>
                <FormControl name="address" />
                <HelpBlock>Pakollinen tieto</HelpBlock>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Puhelinnumero:</ControlLabel>
                <FormControl name="phone" />
                <HelpBlock>Pakollinen tieto</HelpBlock>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Osaamisalue:</ControlLabel>
                <FormControl name="skill" />
                <HelpBlock>Pakollinen tieto</HelpBlock>
              </FormGroup>

              <FormGroup>
                <ButtonToolbar>
                  <Button appearance="primary" onClick={ this.onSubmit }>Tallenna</Button>
                </ButtonToolbar>
              </FormGroup>
            </Form>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={9} className="profileImageContainer">
            <ImageUploader returnProfileImageUrl={ this.onReturnProfileImageUrl } />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    )
  }
}

export default connect(
  null,
  { setActiveTab }
)(AddUser)