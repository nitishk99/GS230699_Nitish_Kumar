import firestore from '../../config/FireBase';
import {
  fetchStoresRequest,
  fetchStoresSuccess,
  fetchStoresFailure,
} from '../actions/storeAction';
import { collection, getDocs } from 'firebase/firestore';

export const fetchStores = () => {
  return async (dispatch: any) => {
    dispatch(fetchStoresRequest());
    try {
      const storesCollection = collection(firestore, 'stores');
      const snapshot = await getDocs(storesCollection);
      const stores = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(fetchStoresSuccess(stores));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(fetchStoresFailure(error.message));
      } else {
        dispatch(fetchStoresFailure('An unknown error occurred'));
      }
    }
  };
};