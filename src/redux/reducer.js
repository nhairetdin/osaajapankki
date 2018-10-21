const initialState = {
  user: false,
  loading: true,
  activeTab: "1"
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
      return { ...state, allArtists: action.data }
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

export default reducer
