import {
  getFirestore,
  collection
} from "firebase/firestore";
import { useApp } from "./app";

export const useDb = () => {
  const firestoreApp = useApp();
  const db = getFirestore(firestoreApp);

  const getSchools = async () => {
    const snapshot = await collection(db, "schools").get();
    return snapshot.docs.map(doc => doc.data());
  };

  return {
    getSchools
  }
};
