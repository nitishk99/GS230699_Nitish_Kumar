import firestore from '../../config/FireBase';
import {
  fetchSkusRequest,
  fetchSkusSuccess,
  fetchSkusFailure,
} from '../actions/skuAction';
import { collection, getDocs } from 'firebase/firestore';

export const fetchSkus = () => {
  return async (dispatch: any) => {
    dispatch(fetchSkusRequest());
    try {
      const skusCollection = collection(firestore, 'sku');
      const snapshot = await getDocs(skusCollection); 
      const skus = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); 
      dispatch(fetchSkusSuccess(skus));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(fetchSkusFailure(error.message));
      } else {
        dispatch(fetchSkusFailure('An unknown error occurred'));
      }
    }
  };
};