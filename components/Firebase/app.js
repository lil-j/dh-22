import { initializeApp } from "firebase/app";
import { config } from "./config";
import {useEffect, useState} from "react";

export const useApp = () => {
  const [firebaseApp, setFirebaseApp] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setFirebaseApp(initializeApp(config));
    setIsLoaded(true);
  }, []);

  return [firebaseApp, isLoaded];
}