import { initializeApp } from "firebase/app";
import { config } from "./config";
import {useEffect, useState} from "react";

export const useApp = () => {
  const [firebaseApp, setFirebaseApp] = useState(null);

  useEffect(() => {
    setFirebaseApp(initializeApp(config));
  }, []);

  return firebaseApp;
}