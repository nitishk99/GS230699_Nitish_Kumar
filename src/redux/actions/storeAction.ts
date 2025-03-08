export const FETCH_STORES_REQUEST = 'FETCH_STORES_REQUEST';
export const FETCH_STORES_SUCCESS = 'FETCH_STORES_SUCCESS';
export const FETCH_STORES_FAILURE = 'FETCH_STORES_FAILURE';

// Action creators for fetching stores
export const fetchStoresRequest = () => ({
  type: FETCH_STORES_REQUEST,
});

export const fetchStoresSuccess = (stores:any) => ({
  type: FETCH_STORES_SUCCESS,
  payload: stores,
});

export const fetchStoresFailure = (error:any) => ({
  type: FETCH_STORES_FAILURE,
  payload: error,
});