"use client";

import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
} from "firebase/auth";
import { jwtDecode } from "jwt-decode";
import { app } from "./firebase.config";
import base_url from "../links/BASE_URL";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const createUser = async (email, password, displayName) => {
    setLoading(true);
    try {
      const response = await fetch(`${base_url}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, displayName }),
      });
      const data = await response.json();
      const token = data.token;
      const decodedToken = jwtDecode(token);

      // Store token and decoded role in localStorage and cookies
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiration", decodedToken.exp);
      Cookies.set("token", token); // Store token in cookies
      Cookies.set("userRole", decodedToken.role); // Store user role in cookies

      setUser(decodedToken);
      router.push("/");
    } catch (error) {
      console.error("Registration Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${base_url}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        const token = data.token;
        const decodedToken = jwtDecode(token);

        // Store token and decoded role in localStorage and cookies
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiration", decodedToken.exp);
        Cookies.set("token", token); // Store token in cookies
        Cookies.set("userRole", decodedToken.role); // Store user role in cookies

        setUser(decodedToken);
        router.push("/");
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      const response = await fetch(`${base_url}/api/auth/googleLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          profilePicture: user.photoURL,
          role: "user",
        }),
      });
  
      const data = await response.json();
      const token = data.token;
      const decodedToken = jwtDecode(token);
  
      // Store token and decoded role in localStorage and cookies
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiration", decodedToken.exp);
      Cookies.set("token", token); // Store token in cookies
      Cookies.set("userRole", decodedToken.role); // Store user role in cookies
  
      setUser(decodedToken);
  
      // Calculate expiration time and set auto-logout
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
      const timeLeft = expirationTime - currentTime;
  
      setTimeout(() => {
        logout();
      }, timeLeft);
  
      // Perform a hard reload to redirect to the home page
      window.location.href = "/";
      
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    } finally {
      setLoading(false);
    }
  };
  


  const logout = () => {
    setLoading(true);
    // Remove token and role from both localStorage and cookies
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    Cookies.remove("token");
    Cookies.remove("userRole"); // Remove role from cookies

    setUser(null);
    signOut(auth).finally(() => setLoading(false));
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || Cookies.get("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const userRole = Cookies.get("userRole");
    const currentTime = Date.now() / 1000; // current time in seconds

    if (token && tokenExpiration > currentTime) {
      setUser(jwtDecode(token));
      const timeLeft = tokenExpiration * 1000 - Date.now();
      setTimeout(() => {
        logout();
      }, timeLeft);
    } else {
      logout(); // log out if token has expired
    }

    // Check for role-based access (example)
    if (userRole && userRole !== "admin") {
      console.log("Access Denied: Insufficient Role"); // Example of role-based restriction
    }
    setLoading(false);
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    login,
    googleSignIn,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;