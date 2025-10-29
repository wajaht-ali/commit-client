/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { auth, googleProvider, githubProvider } from "../../Firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      if (!userCred.user.emailVerified) {
        toast.error("Please verify your email before logging in.");
        return;
      }
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in successfully!");
      setTimeout(() => navigate("/"), 300);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      toast.success("Logged in successfully!");
      setTimeout(() => navigate("/"), 300);
    } catch (error) {
      toast.error(error.message);
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

      {/* Loading Overlay */}
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

      {/* Login Card */}
      <motion.div
        className="relative w-full max-w-md p-8 m-6 lg:m-auto bg-gray-700 shadow-2xl rounded-2xl backdrop-blur-lg"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400">Or login with</p>
          <div className="flex justify-center mt-2 gap-4">
            <button
              onClick={handleGoogleLogin}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Google
            </button>
            <button
              onClick={handleGithubLogin}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
            >
              GitHub
            </button>
          </div>
        </div>

        <p className="mt-4 text-sm text-center text-gray-300">
          Don’t have an account?{" "}
          <Link to="/auth/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="mt-4 text-sm text-center text-gray-300">
          Forgotten your password?{" "}
          <Link to="/auth/reset-password" className="text-blue-400 hover:underline">
            Reset Password
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
