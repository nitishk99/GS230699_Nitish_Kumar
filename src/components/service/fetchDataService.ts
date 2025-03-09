import { collection, getDocs } from "firebase/firestore";
import firestore from "../../config/FireBase";

interface SkuRow {
    id: string;
    sku: string;
    price: number;
    cost: number;
}

      export  const fetchSkuData = async () => {
            const querySnapshot = await getDocs(collection(firestore, "sku"));
            const skus = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    sku: data.sku,
                    price: data.price,
                    cost: data.cost,
                } as SkuRow;
            });

        };