import firestore from "../../config/FireBase";
import { setStores } from "../slice/storeSclice";
import { collection, getDocs } from "firebase/firestore";
import { AppDispatch } from "../store";

// Fetch Stores from Firebase db
export const fetchStores = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const storesCollection = collection(firestore, "stores");
      const snapshot = await getDocs(storesCollection);
      const stores = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setStores(stores));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  };
};
