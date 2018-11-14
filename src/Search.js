import React, { Component } from 'react'
import { FlexboxGrid, Divider } from 'rsuite'
import FilterMenu from './FilterMenu'
import SearchResultsTable from './SearchResultsTable'
import './Search.css'
import { getArtists } from './firebase/db'
import { connect } from 'react-redux'
import { setStateAllArtists } from './redux/reducer'

class Search extends Component {
  componentDidMount = async () => {
    const artists = await getArtists()
    console.log(artists)
    this.props.setStateAllArtists(artists)
  }

  render() {
    return (
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={22}>
          <Divider></Divider>
        </FlexboxGrid.Item>

        <FlexboxGrid.Item colspan={4} className="filterContainer">
          <FilterMenu />
        </FlexboxGrid.Item>

        <FlexboxGrid.Item colspan={20} className="resultsContainer">
          <SearchResultsTable />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    )
  }
}

export default connect(
  null,
  { setStateAllArtists }
)(Search)