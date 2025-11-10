/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaGithub, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Puff } from 'react-loader-spinner';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, githubProvider, googleProvider } from "../../Firebase.js";
import { useAuth } from '../../context/AuthContext.jsx';
import toast from 'react-hot-toast';
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
      window.location.replace("/");
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
      window.location.replace("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#111111]">
      <motion.div
        className="hidden lg:flex lg:w-1/2 items-center justify-center bg-[radial-gradient(circle_at_top,#38bdf8_0%,#0284c7_45%,_#000000_100%)] p-12 text-white"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-6">Build Your Commitment Through Code</h2>
          <p className="text-lg mb-8">
            Create your account and join us in our commitment to code.
          </p>
          {/* <div className="space-y-4">
      <div className="flex items-center p-4 bg-white text-black rounded-lg shadow-lg">
        <div className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full mr-4">1</div>
        <span>Sign up your account</span>
      </div>
      <div className="flex items-center p-4 bg-gray-800 rounded-lg">
        <div className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full mr-4">2</div>
        <span>Set up your workspace</span>
      </div>
      <div className="flex items-center p-4 bg-gray-800 rounded-lg">
        <div className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full mr-4">3</div>
        <span>Set up your profile</span>
      </div>
    </div> */}
        </motion.div>
      </motion.div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <AnimatePresence>
          {loading && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Puff
                visible={true}
                height="80"
                width="80"
                color="#1598D8"
                ariaLabel="puff-loading"
              />
              <motion.p
                className="mt-4 text-lg font-semibold text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Signing Up...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">Sign Up Account</h2>
          <p className="text-gray-400 mb-8">Enter your personal data to create your account.</p>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => handleProviderSignup(googleProvider)}
              className="flex-1 py-3 px-4 flex items-center justify-center gap-2 bg-[#1f1f1f] text-white rounded-lg hover:bg-gray-800 transition-all duration-200 hover:cursor-pointer"
            >
              <FcGoogle /> Google
            </button>
            <button
              onClick={() => handleProviderSignup(githubProvider)}
              className="flex-1 py-3 px-4 flex items-center justify-center gap-2 bg-[#1f1f1f] text-white rounded-lg hover:bg-gray-800 transition-all duration-200 hover:cursor-pointer"
            >
              <FaGithub /> Github
            </button>
          </div>

          <div className="relative flex items-center mb-6">
            <hr className="w-full border-gray-600" />
            <span className="absolute left-1/2 -translate-x-1/2 bg-[#111111] px-2 text-gray-400">Or</span>
          </div>

          {error && (
            <motion.p
              className="text-red-400 text-center my-4 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full p-3 bg-[#1f1f1f] text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full p-3 bg-[#1f1f1f] text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-3 bg-[#1f1f1f] text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="text-xs text-gray-500">Must be at least 8 characters.</p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 hover:cursor-pointer"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-sky-400 hover:underline">
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
