import React, { Component } from 'react'
import { Input, InputGroup } from 'rsuite'
import './FilterMenu.css'

class FilterMenu extends Component {
  render() {
    return (
      <div>
        <Input size="sm" placeholder="Nimi..." className="filterInput" />
        <Input size="sm" placeholder="Kaupunki..." className="filterInput" />
        <Input size="sm" placeholder="Osaamisala..." className="filterInput" />
      </div>
    )
  }
}

export default FilterMenu