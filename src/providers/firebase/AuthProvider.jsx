"use client";

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
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export const AuthContext = createContext(null);

const auth = getAuth(app);


const AuthProvider = ({ children }) => {

  const router = useRouter();

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

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${base_url}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log(response, "response");

      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        localStorage.setItem("token", data.token);
        const decoded_data = jwtDecode(data.token);
        setUser(decoded_data);
        router.push('/')
      } else {
        setLoading(false);
        // Handle login failure
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedData = jwtDecode(token);
        setUser(decodedData);
      } catch (error) {
        console.error("Error decoding JWT token:", error);
        // Handle invalid token or decoding error as needed
      }
    }
  }, []);

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("token");
    setUser(null);
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
