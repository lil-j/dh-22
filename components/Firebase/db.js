import {
  getFirestore,
  getDocs,
  collection,
  query,
  where
} from "firebase/firestore";
import { useApp } from "./app";
import {useEffect, useState} from "react";

export const useDb = () => {
  const firebaseApp = useApp();
  const [db, setDb] = useState(null);

  useEffect(() => {
    if (!firebaseApp)
      return null;

    setDb(getFirestore(firebaseApp));
  }, [firebaseApp]);

  const getSchools = async () => {
    const q = query(collection(db, "schools"));
    return await getDocs(q);
  };

  const getSchool = async (id) => {
    const q = query(collection(db, "schools"), where("id", "==", id));
    return await getDoc(q);
  };

  return db ? {
    getSchools
  } : null;
};
