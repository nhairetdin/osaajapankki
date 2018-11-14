import React, { Component } from 'react'
import { Modal, Button, Loader, FlexboxGrid } from 'rsuite'
import { connect } from 'react-redux'
import { toggleDisplayUserModal } from './redux/reducer'

class DisplayUserModal extends Component {
  state = {
    imageLoaded: false
  }

  close = () => {
    this.setState({ imageLoaded: false })
    this.props.toggleDisplayUserModal()
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
              <p><span style={{ fontWeight: 'bold' }}>Nimi:</span> { this.props.displayModal.name } </p>
              <p><span style={{ fontWeight: 'bold' }}>Kaupunki:</span> { this.props.displayModal.city } </p>
              <p><span style={{ fontWeight: 'bold' }}>Osoite:</span> { this.props.displayModal.address } </p>
              <p><span style={{ fontWeight: 'bold' }}>Email:</span> { this.props.displayModal.email } </p>
              <p><span style={{ fontWeight: 'bold' }}>Puhelin:</span> { this.props.displayModal.phone } </p>
              <p><span style={{ fontWeight: 'bold' }}>Osaamisalue:</span> { this.props.displayModal.skill } </p>
              <p><span style={{ fontWeight: 'bold' }}>Yhteyshenkilö:</span> { this.props.displayModal.contactperson } </p>
              <p><span style={{ fontWeight: 'bold' }}>Verkkosivu:</span> <a target="_blank" href={ this.getUrlPrefix(this.props.displayModal.website) + this.props.displayModal.website }>{ this.props.displayModal.website }</a></p>
              <p><span style={{ fontWeight: 'bold' }}>Erityishuomioita:</span> { this.props.displayModal.notes } </p>
              <p><span style={{ fontWeight: 'bold' }}>Mukana projekteissa:</span> </p>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this.close } appearance="primary">
            Ok
          </Button>
          <Button onClick={ this.close } appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
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
  { toggleDisplayUserModal }
)(DisplayUserModal)
