import firestore from '../../config/FireBase';
import {
  setSkus,
} from '../slice/skuSlice'; 
import { collection, getDocs } from 'firebase/firestore';
import { AppDispatch } from '../store';

export const fetchSkus = () => {
  return async (dispatch: AppDispatch) => { 
    try {
      const skusCollection = collection(firestore, 'sku');
      const snapshot = await getDocs(skusCollection);
      const skus = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(setSkus(skus));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An unknown error occurred');
      }
    }
  };
};