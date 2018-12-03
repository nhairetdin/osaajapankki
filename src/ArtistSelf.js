import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlexboxGrid, Divider, Button, Form, FormGroup, ControlLabel, FormControl, Icon, Notification } from 'rsuite'
import * as auth from './firebase/auth'
import { updateProjectsField } from './firebase/db'

class ArtistSelf extends Component {
  state = {
    formValue: {
      projects: this.props.user.projects
    }
  }

  handleChange = (value) => {
    this.setState({ formValue: value })
  }

  saveProjects = async () => {
    if(await updateProjectsField(this.props.user.email, this.state.formValue.projects)) {
      Notification['success']({
        title: 'Projektit päivitetty!'
      })
    } else {
      Notification['error']({
        title: 'Virhe, yritä myöhemmin uudelleen'
      })
    }
  }

  render() {
    let content
    
    if (this.props.user.flag_authorized) {
      content = (
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={22}>
            <Form onChange={ this.handleChange } formValue={ this.state.formValue }>
              <FormGroup>
                <ControlLabel>Projektit:</ControlLabel>
                <FormControl name="projects" componentClass="textarea" rows={4} />
              </FormGroup>
            </Form>
            <br />
            <Button appearance="primary" onClick={ this.saveProjects }>
              <Icon icon="save" /> Tallenna
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      )
    } else {
      content = (
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={22}>
            <p>Tietojasi ei ole lisätty tietokantaan, ota yhteyttä: ...</p>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      )
    }

    return content
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps
)(ArtistSelf)