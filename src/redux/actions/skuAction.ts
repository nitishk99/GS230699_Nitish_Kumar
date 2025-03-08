export const FETCH_SKUS_REQUEST = 'FETCH_SKUS_REQUEST';
export const FETCH_SKUS_SUCCESS = 'FETCH_SKUS_SUCCESS';
export const FETCH_SKUS_FAILURE = 'FETCH_SKUS_FAILURE';

// Action creators for fetching SKUs
export const fetchSkusRequest = () => ({
  type: FETCH_SKUS_REQUEST,
});

export const fetchSkusSuccess = (skus:any) => ({
  type: FETCH_SKUS_SUCCESS,
  payload: skus,
});

export const fetchSkusFailure = (error:any) => ({
  type: FETCH_SKUS_FAILURE,
  payload: error,
});