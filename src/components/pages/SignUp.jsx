/* eslint-disable no-unused-vars */

import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { auth, githubProvider, googleProvider } from "../../Firebase.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const res = await axios.post(`${API_URL}/api/v1/user/googleSignup`, { name, email });
      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }
      setUser(res.data.userData);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProviderSignup = async (provider) => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const res = await axios.post(`${API_URL}/api/v1/user/googleSignup`, { name: user.displayName, email: user.email });
      
      setUser(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Blur animated background */}
      <motion.div
        className="absolute inset-0 backdrop-blur-3xl bg-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Loading Popper */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signup card */}
      <motion.div
        className="relative w-full max-w-md p-8 bg-gray-800/70 shadow-2xl rounded-2xl backdrop-blur-lg"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-white tracking-tight">
          Create your account
        </h2>

        {error && (
          <motion.p
            className="text-red-400 text-center mb-4 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 bg-gray-900/50 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-900/50 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-900/50 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 hover:cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 mb-2 text-sm">or sign up with</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleProviderSignup(googleProvider)}
              className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:cursor-pointer"
            >
              Google
            </button>
            <button
              onClick={() => handleProviderSignup(githubProvider)}
              className="bg-gray-700/80 hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:cursor-pointer"
            >
              GitHub
            </button>
          </div>
        </div>

        <p className="mt-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}

