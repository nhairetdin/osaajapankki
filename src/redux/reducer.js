const initialState = {
  user: false,
  loading: true,
  activeTab: "1",
  allArtists: [],
  filteredArtists: [],
  filters: {},
  displayUserModal: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGOUT_USER': {
      return { ...state, user: false, loading: false }
    }
    case 'TOGGLE_LOADING': {
      return { ...state, loading: !state.loading }
    }
    case 'SET_USERDATA': {
      return { ...state, user: action.data, loading: false }
    }
    case 'SET_ACTIVE_TAB': {
      return { ...state, activeTab: action.data }
    }
    case 'SET_ALL_ARTISTS': {
      return { ...state, allArtists: action.data, filteredArtists: action.data }
    }
    case 'SET_FILTERS': {
      return { ...state, filteredArtists: applyFilters(state.allArtists, action.data) }
    }
    case 'TOGGLE_DISPLAY_USERMODAL': {
      return state.displayUserModal ? { ...state, displayUserModal: false } : { ...state, displayUserModal: action.data }
      //return { ...state, displayUserModal: !state.displayUserModal }
    }
    case 'DELETE_USER': {
      return {
        ...state,
        allArtists: state.allArtists.filter(artist => artist.email !== action.data),
        filteredArtists: state.filteredArtists.filter(artist => artist.email !== action.data)
      }
    }
    case 'UPDATE_CHANGED_USERDATA': {
      console.log(state.allArtists)
      return { 
        ...state, 
        displayUserModal: { 
          ...state.displayUserModal, 
          ...action.data },
        allArtists: state.allArtists.map(artist => {
          if (artist.email === action.email) {
            return { ...artist, ...action.data }
          } else {
            return artist
          }
        }),
        filteredArtists: state.filteredArtists.map(artist => {
          if (artist.email === action.email) {
            return { ...artist, ...action.data }
          } else {
            return artist
          }
        })
      }
    }
    default:
      return state
  }
}

export const setStateLogoutUser = () =>  {
  return {
    type: 'LOGOUT_USER'
  }
}

export const setStatePersonalData = (data) => {
  return {
    type: 'SET_USERDATA',
    data: data
  }
}

export const toggleLoading = () => {
  return {
    type: 'TOGGLE_LOADING'
  }
}

export const setActiveTab = (activeTab) => {
  return {
    type: 'SET_ACTIVE_TAB',
    data: activeTab
  }
}

export const setStateAllArtists = (artists) => {
  return {
    type: 'SET_ALL_ARTISTS',
    data: artists
  }
}

export const setStateFilters = (filters) => {
  return {
    type: 'SET_FILTERS',
    data: filters
  }
}

export const toggleDisplayUserModal = (rowData) => {
  return {
    type: 'TOGGLE_DISPLAY_USERMODAL',
    data: rowData
  }
}

export const deleteUser = (useremail) => {
  return {
    type: 'DELETE_USER',
    data: useremail
  }
}

export const updateChangedUserdata = (email, data) => {
  return {
    type: 'UPDATE_CHANGED_USERDATA',
    email: email,
    data: data
  }
}

const applyFilters = (allArtists, filters) => {
  let filteredArtists = allArtists.filter(artist => {
    let found = true
    Object.keys(filters).forEach(key => {
      if (!artist[key].toLowerCase().includes(filters[key].toLowerCase())) {
        found = false
      }
    })
    return found
  })
  return filteredArtists
}

export default reducer
