const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    element: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHED':
            return { 
                ...state,
                filters: action.payload
            }
        case 'ELEMENT_FETCHED':
            return {
                ...state,
                element: action.payload
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }    
        default: return state
    }
}

export default reducer;