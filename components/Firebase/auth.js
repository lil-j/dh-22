import { useState, useEffect, useContext, createContext } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fSignOut,
  sendPasswordResetEmail as fSendPasswordResetEmail,
  confirmPasswordReset as fConfirmPasswordReset,
} from "firebase/auth";
import { useApp } from "./app";

export const useAuth = () => {
  const [firebaseApp, isFirebaseAppLoaded] = useApp();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  let auth;
  if (isFirebaseAppLoaded)
    auth = getAuth(firebaseApp);

  useEffect(() => {
    if (!isFirebaseAppLoaded) {
      return null;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [user, isFirebaseAppLoaded]);

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email, password) => {
    // Firestore (optional): uncomment the next line if you want to create a database for your users
    // const usersRef = collection(db, "users");

    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Firestore (optional): uncomment the next block of code if you want to create a database for your users
    // await addDoc(usersRef, { // adds new user to 'users' collection
    //   uuid: response.user.uid,
    //   timestamp: Timestamp.now(),
    //   email,
    // });
  };

  const signOut = async () => {
    await fSignOut(auth);
  };

  const sendPasswordResetEmail = async (email) => {
    await fSendPasswordResetEmail(auth, email);
  };

  const confirmPasswordReset = async (password, oobCode) => {
    await fConfirmPasswordReset(auth, oobCode, password);
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};
