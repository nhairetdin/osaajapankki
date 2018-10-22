import React, { Component } from 'react'
import { Input, InputGroup } from 'rsuite'
import { connect } from 'react-redux'
import { setStateFilters } from './redux/reducer'
import './FilterMenu.css'

class FilterMenu extends Component {
  state = {
    name: '',
    city: '',
    skill: ''
  }

  onNameChange = (value) => {
    this.setState({ ...this.state, name: value }, () => { this.props.setStateFilters(this.state) })
    //this.props.setFilter({ name: value })
    //console.log(this.props.filters)
  }

  onCityChange = (value) => {
    this.setState({ ...this.state, city: value }, () => { this.props.setStateFilters(this.state) })
    //this.props.setFilter({ city: value })
    //console.log(this.props.filters)
  }

  onSkillChange = (value) => {
    this.setState({ ...this.state, skill: value }, () => { this.props.setStateFilters(this.state) })
    //this.props.setFilter({ skill: value })
    //console.log(this.props.filters)
  }

  render() {
    return (
      <div>
        <Input size="sm" placeholder="Nimi..." className="filterInput" onChange={ (value) => this.onNameChange(value) }/>
        <Input size="sm" placeholder="Kaupunki..." className="filterInput" onChange={ (value) => this.onCityChange(value) }/>
        <Input size="sm" placeholder="Osaamisala..." className="filterInput" onChange={ (value) => this.onSkillChange(value) }/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

export default connect(
  mapStateToProps,
  { setStateFilters }
)(FilterMenu)