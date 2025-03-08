import {
    FETCH_STORES_REQUEST,
    FETCH_STORES_SUCCESS,
    FETCH_STORES_FAILURE,
  } from '../actions/storeAction';
  
  const initialState = {
    stores: [],
    loading: false,
    error: null,
  };
  
  const storesReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case FETCH_STORES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_STORES_SUCCESS:
        return {
          ...state,
          loading: false,
          stores: action.payload,
        };
      case FETCH_STORES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default storesReducer;