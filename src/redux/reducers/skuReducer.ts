import {
    FETCH_SKUS_REQUEST,
    FETCH_SKUS_SUCCESS,
    FETCH_SKUS_FAILURE,
  } from '../actions/skuAction';
  
  const initialState = {
    skus: [],
    loading: false,
    error: null,
  };
  
  const skuReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case FETCH_SKUS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_SKUS_SUCCESS:
        return {
          ...state,
          loading: false,
          skus: action.payload,
        };
      case FETCH_SKUS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default skuReducer;