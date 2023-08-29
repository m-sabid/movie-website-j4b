"use client"

import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import { app } from "./firebase.config";
import base_url from "../links/BASE_URL";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const createUser = async (email, password, displayName, photoUrl) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName,
        photoURL: photoUrl,
      });
      setLoading(false);
      setUser(userCredential.user);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       // token
//       if (currentUser) {
//         axios
//           .post(`${base_url}/jwt`, { email: currentUser.email })
//           .then((data) => {
//             localStorage.setItem("access-token", data.data.token);
//             setLoading(false);
//           });
//       } else {
//         localStorage.removeItem("access-token");
//       }
//     });
//     return () => {
//       return unsubscribe();
//     };
//   }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    login,
    googleSignIn,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;