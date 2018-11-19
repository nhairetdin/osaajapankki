import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleDisplayUserModal } from './redux/reducer'
import DisplayUserModal from './DisplayUserModal'
import { Table } from 'rsuite';
import './SearchResultsTable.css'
const { Column, HeaderCell, Cell, Pagination } = Table;

class SearchResultsTable extends Component {
  state = {
    displayLength: 10,
    loading: false,
    page: 1
  }

  handleChangePage = (dataKey) => {
    this.setState({
      page: dataKey
    })
  }

  handleChangeLength = (dataKey) => {
    this.setState({
      page: 1,
      displayLength: dataKey
    })
  }

  render() {
    const start = this.state.displayLength * (this.state.page - 1)
    const end = start + this.state.displayLength

    return (
      <div>
        <DisplayUserModal />
        <Table
          autoHeight
          data={this.props.artists.slice(start, end)}
          onRowClick={ (rowData) => this.props.toggleDisplayUserModal(rowData) }
          rowHeight={38}
        >
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

          <Column width={200} resizable>
            <HeaderCell className="headerCell">Katuosoite</HeaderCell>
            <Cell dataKey="address" />
          </Column>

          <Column width={150} resizable>
            <HeaderCell className="headerCell">Puhelin</HeaderCell>
            <Cell dataKey="phone" />
          </Column>

          <Column flexGrow={1} align="right">
            <HeaderCell className="headerCell">Sähköposti</HeaderCell>
            <Cell dataKey="email" />
          </Column>
        </Table>

        <Pagination
          lengthMenu={[
            {
              value: 10,
              label: 10
            },
            {
              value: 20,
              label: 20
            }
          ]}
          activePage={this.state.page}
          displayLength={this.state.displayLength}
          total={this.props.artists.length}
          onChangePage={this.handleChangePage}
          onChangeLength={this.handleChangeLength}
        />
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
  mapStateToProps,
  { toggleDisplayUserModal }
)(SearchResultsTable)