/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase.js";
import axios from "axios";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fUser) => {
      setFirebaseUser(fUser);
      if (fUser) {
        const res = await axios.post(`${API_URL}/api/v1/user/googleSignup`, {
          name: fUser.displayName,
          email: fUser.email,
          avatar: fUser.photoURL || "",
        });
        const dbUser = res.data;
        if (res.data?.token) {
          localStorage.setItem("commit:token", res.data.token);
        }

        setUser(dbUser);
      } else {
        setUser(null);
        localStorage.removeItem("commit:token");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser, user, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
