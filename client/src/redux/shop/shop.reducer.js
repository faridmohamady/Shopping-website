import shopActionTypes from './shop.types';
const INITIAL_STATE = {
    collections: null,
    iSFetching: false,
    errorMessage: undefined
}

const shopReducer = (state =INITIAL_STATE, action) =>{
    switch(action.type){
        case shopActionTypes.FETCH_COLLECTIONS_START:
            return{
                ...state,
                iSFetching: true
            }
        case shopActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return{
                ...state,
                iSFetching: false,
                collections: action.payload
            }
        case shopActionTypes.FETCH_COLLECTIONS_FAILURE:
            return{
                ...state,
                errorMessage: action.payload,
                iSFetching: false
            }
        default:
            return state;
    }
}

export default shopReducer;