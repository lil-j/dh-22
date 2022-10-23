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
  const firebaseApp = useApp();
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!firebaseApp)
      return null;

    const temp = getAuth(firebaseApp);
    setAuth(temp);
    const unsubscribe = onAuthStateChanged(temp, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [user, firebaseApp]);

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
    signIn,
    signUp,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};
