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

const initialState = {
  email: "",
  name: "",
  city: "",
  address: "",
  phone: "",
  skill: "",
  profileImageUrl: "https://firebasestorage.googleapis.com/v0/b/osaajapankki2.appspot.com/o/profileimages%2Favatar.png?alt=media&token=64361396-5e90-428d-a6a4-d72c1d413ea1",
  contactperson: "",
  website: "",
  notes: "",
  projects: ""
}

class AddUser extends Component {
  state = {
    form: { ...initialState },
    formNotValid: true
  }

  componentWillMount = () => {
    console.log('Profile will mount')
    this.props.setActiveTab("2")
  }

  onProfileFormChange = (formObj) => {
    this.setState({ form: { ...this.state.form, ...formObj} }, () => {
      if (this.requiredFieldsFilled()) {
        this.setState({ formNotValid: false })
      } else {
        this.setState({ formNotValid: true })
      }
    })
  }

  onReturnProfileImageUrl = (url) => {
    console.log(url)
    this.setState({ form: { ...this.state.form, profileImageUrl: url } })
  }

  onSubmit = async () => {
    const userSuccessfullyAdded = await addNewUserToDatabase(this.state.form)
    if (userSuccessfullyAdded) {
      Notification['success']({
        title: 'Lisättiin käyttäjä',
        description: this.state.form.name
      })
      this.setState({ form: { ...initialState } })
    } else {
      Notification['error']({
        title: 'Virhe lisättäessä käyttäjää',
        description: 'Yritä myöhemmin uudelleen, tai ota yhteyttä ylläpitoon'
      })
    }
  }

  requiredFieldsFilled = () => {
    const required = ['email', 'name', 'city', 'address', 'phone', 'skill', 'contactperson']
    let isValid = true
    for (let i in required) {
      if (this.state.form[required[i]] === "") {
        isValid = false
      }
    }
    return isValid
  }

  render() {
    return (
      <div>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={18}>
            <Divider></Divider>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={9}>
            <Form 
              fluid 
              onChange={ (obj) => this.onProfileFormChange(obj) }
              formValue={ this.state.form }
            >
              <FormGroup>
                <ControlLabel>Sähköposti:<span className="inputRequired">*</span></ControlLabel>
                <FormControl name="email" />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Nimi:<span className="inputRequired">*</span></ControlLabel>
                <FormControl name="name" />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Kaupunki:<span className="inputRequired">*</span></ControlLabel>
                <FormControl name="city" />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Katuosoite:<span className="inputRequired">*</span></ControlLabel>
                <FormControl name="address" />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Puhelinnumero:<span className="inputRequired">*</span></ControlLabel>
                <FormControl name="phone" />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Osaamisalue:<span className="inputRequired">*</span></ControlLabel>
                <FormControl name="skill" />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Yhteyshenkilö:<span className="inputRequired">*</span></ControlLabel>
                <FormControl name="contactperson" />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Verkkosivu:</ControlLabel>
                <FormControl name="website" />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Erityishuomioita:</ControlLabel>
                <FormControl name="notes" />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Projektit:</ControlLabel>
                <FormControl name="projects" componentClass="textarea" rows={4} />
              </FormGroup>

              <FormGroup>
                <ButtonToolbar>
                  <Button appearance="primary" onClick={ this.onSubmit } disabled={ this.state.formNotValid }>Tallenna</Button>
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