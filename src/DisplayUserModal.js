import React, { Component } from 'react'
import { Modal, Button, Loader, FlexboxGrid, Toggle, Icon, Notification, Whisper, Popover, Input, InputGroup } from 'rsuite'
import { connect } from 'react-redux'
import { toggleDisplayUserModal, deleteUser, updateChangedUserdata } from './redux/reducer'
import { removeUserFromDatabase, updateUserdata } from './firebase/db'
import './DisplayUserModal.css'

class DisplayUserModal extends Component {
  state = {
    imageLoaded: false,
    toggleDeleteButton: true
  }

  close = () => {
    this.setState({ imageLoaded: false, toggleDeleteButton: true })
    this.props.toggleDisplayUserModal()
  }

  switchToggleState = () => {
    console.log("toggleState called")
    this.setState({ toggleDeleteButton: !this.state.toggleDeleteButton })
  }

  removeUser = async () => {
    const deleted = await removeUserFromDatabase(this.props.displayModal.email)
    if (deleted) {
      this.props.deleteUser(deleted)
      Notification['success']({
        title: 'Henkilö poistettu tietokannasta:',
        description: this.props.displayModal.name
      })
      this.close()
    } else {
      console.log("delete failed")
    }
  }

  getUrlPrefix = (url) => {
    let prefix

    if (!url) {
      return ""
    }

    if (url.startsWith("http")) {
      prefix = ""
    } else {
      prefix = "//"
    }
    return prefix
  }

  onSaveChange = async (changedField) => {
    if (await updateUserdata(this.props.displayModal.email, changedField)) {
      this.props.updateChangedUserdata(this.props.displayModal.email, changedField)
    } else {
      console.log("fail")
    }
  }

  render() {
    console.log(this.props.displayModal)
    return (
      <Modal size="lg" show={ this.props.displayModal } onHide={ this.close }>
        <Modal.Header>
          <Modal.Title>{ this.props.displayModal.name }</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={8}>
              <img 
                src={ this.props.displayModal.profileImageUrl } 
                onLoad={ () => this.setState({ imageLoaded: true }) }
              />
              { this.state.imageLoaded ? (null) : (<Loader size="lg" />) }
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={16}>
              <ul style={{ listStyleType: 'none' }}>
                <li><CustomComponent data={ this.props.displayModal } accessor="name" displ="Nimi: " onSaveChange={ this.onSaveChange } /></li>
                <li><CustomComponent data={ this.props.displayModal } accessor="city" displ="Kaupunki: " onSaveChange={ this.onSaveChange } /></li>
                <li><CustomComponent data={ this.props.displayModal } accessor="address" displ="Osoite: " onSaveChange={ this.onSaveChange } /></li>
                <li><p><span style={{ fontWeight: 'bold' }}>Sähköposti: </span> { this.props.displayModal.email }</p></li>
                <li><CustomComponent data={ this.props.displayModal } accessor="phone" displ="Puhelin: " onSaveChange={ this.onSaveChange } /></li>
                <li><CustomComponent data={ this.props.displayModal } accessor="skill" displ="Osaamisalue: " onSaveChange={ this.onSaveChange } /></li>
                <li><CustomComponent data={ this.props.displayModal } accessor="contactperson" displ="Yhteyshenkilö: " onSaveChange={ this.onSaveChange } /></li>
                <li><CustomComponent data={ this.props.displayModal } accessor="website" displ="Verkkosivu: " onSaveChange={ this.onSaveChange } /></li>
                <li><CustomComponent data={ this.props.displayModal } accessor="notes" displ="Erityishuomioita: " onSaveChange={ this.onSaveChange } /></li>
                <li><CustomComponent data={ this.props.displayModal } accessor="projects" displ="Projektit: " onSaveChange={ this.onSaveChange } textarea={ true }/></li>
              </ul>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Modal.Body>

        <Modal.Footer>
          <Toggle onChange={ this.switchToggleState } />

          <Button size="sm" onClick={ this.removeUser } appearance="primary" color="red" disabled={ this.state.toggleDeleteButton }>
            <Icon icon="trash" /> Poista henkilö
          </Button>

          <Button size="sm" onClick={ this.close } appearance="primary">
            <Icon icon="close" /> Sulje
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

class CustomComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: props.data[props.accessor]
    }
  }

  onChange = (val) => {
    this.setState({ inputValue: val })
  }

  render() {
    return (
      <Whisper
        trigger="click"
        placement="left"
        speaker={
          <Popover>
            <InputGroup style={{ width: 300 }}>
              <Input componentClass={ this.props.textarea ? "textarea" : "input" } value={ this.state.inputValue } onChange={ (val) => this.onChange(val) } />
              <InputGroup.Button color="cyan" onClick={ () => this.props.onSaveChange({ [this.props.accessor]: this.state.inputValue }) }>
                Tallenna
              </InputGroup.Button>
            </InputGroup>
          </Popover>
        }
      >
        <p><span style={{ fontWeight: 'bold' }}>{ this.props.displ }</span> { this.props.data[this.props.accessor] }</p>
      </Whisper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    displayModal: state.displayUserModal
  }
}

export default connect(
  mapStateToProps,
  { toggleDisplayUserModal, deleteUser, updateChangedUserdata }
)(DisplayUserModal)
