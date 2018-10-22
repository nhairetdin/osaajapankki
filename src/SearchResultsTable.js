import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'rsuite';
import './SearchResultsTable.css'
const { Column, HeaderCell, Cell, Pagination } = Table;

class SearchResultsTable extends Component {
  render() {
    return (
      <div>
        <Table autoHeight data={ this.props.artists }>
          <Column width={200} resizable>
            <HeaderCell className="headerCell">Nimi</HeaderCell>
            <Cell dataKey="name" className="nameCell" />
          </Column>

          <Column width={100} resizable>
            <HeaderCell className="headerCell">Kaupunki</HeaderCell>
            <Cell dataKey="city" />
          </Column>

          <Column width={150} resizable>
            <HeaderCell className="headerCell">Osaamisalue</HeaderCell>
            <Cell dataKey="skill" />
          </Column>

          <Column flexGrow={1} align="right">
            <HeaderCell className="headerCell">Sähköposti</HeaderCell>
            <Cell dataKey="email" />
          </Column>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    artists: state.filteredArtists
  }
}

export default connect(
  mapStateToProps
)(SearchResultsTable)