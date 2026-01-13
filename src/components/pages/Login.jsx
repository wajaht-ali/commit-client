/* eslint-disable no-unused-vars */
import { useState } from "react";
import { auth, googleProvider, githubProvider } from "../../Firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { ClipLoader } from 'react-spinners';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaGithub, FaExclamationCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      const res = await axios.post(`${API_URL}/api/v1/user/googleSignup`, {
        name: userCred.user.displayName,
        email: userCred.user.email,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      setUser(res.data.userData);
      toast.success("Welcome back!");
      window.location.replace("/");
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProviderLogin = async (provider) => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await axios.post(`${API_URL}/api/v1/user/googleSignup`, {
        name: user.displayName,
        email: user.email,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        setError(res.data.message);
        return;
      }
      setUser(res.data.userData);
      toast.success("Logged in successfully!");
      window.location.replace("/");
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        try {
          const email = error.customData.email;
          const pendingCred = GithubAuthProvider.credentialFromError(error);

          const methods = await fetchSignInMethodsForEmail(auth, email);

          if (methods.length === 0) {
            toast.error("This email is already in use. Please sign in with your original method (e.g., Google or Password).", { duration: 5000 });
            setError("This email is already in use. Please sign in with your original method.");
            setLoading(false);
            return;
          }

          const existingProviderId = methods[0];
          let providerToSignIn;

          if (existingProviderId === GoogleAuthProvider.PROVIDER_ID) {
            providerToSignIn = googleProvider;
            toast.info("This email is registered with Google. Please sign in with Google to link your GitHub account.");
          } else if (existingProviderId === GithubAuthProvider.PROVIDER_ID) {
            providerToSignIn = githubProvider;
            toast.info("Please sign in with GitHub to continue.");
          } else {
            toast.error(`This email is associated with a ${existingProviderId} account. Please sign in with that method first.`);
            setLoading(false);
            return;
          }
          const authResult = await signInWithPopup(auth, providerToSignIn);

          await linkWithCredential(authResult.user, pendingCred);
          toast.success("Accounts linked successfully! You can now sign in with either method.");

          const res = await axios.post(`${API_URL}/api/v1/user/processAuthUser`, {
            name: authResult.user.displayName,
            email: authResult.user.email,
          });

          if (res.data.success) {
            setUser(res.data.userData);
            navigate("/");
          } else {
            toast.error(res.data.message);
            setError(res.data.message);
          }
        } catch (linkError) {
          console.error("Account linking failed:", linkError);
          toast.error(`Could not link accounts: ${linkError.message}`);
        }
      } else {
        console.error("Provider sign-in error:", error);
        setError(error.message);
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950">

      {/* Left Side - Hero / Decor */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-0 w-full h-full bg-slate-950 z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-600/20 rounded-full blur-[120px] z-0"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] z-0"></div>

        <div className="relative z-10 max-w-lg text-center fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-50 leading-tight">
            Build Your Commitment <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Through Code</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Create your account and join us in our commitment to code. Experience real-time collaboration like never before.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-slate-950 lg:bg-slate-950/50">

        {/* Mobile Background Glow */}
        <div className="lg:hidden absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="w-full max-w-md w-full glass-panel p-8 sm:p-10 rounded-2xl border border-slate-800/60 shadow-2xl relative fade-in-up delay-100">

          {loading && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-50 rounded-2xl flex flex-col items-center justify-center transition-opacity duration-300">
              <ClipLoader color="#0EA5E9" size={50} />
              <p className="mt-4 text-slate-300 font-medium animate-pulse">Signing In...</p>
            </div>
          )}

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-50 mb-2">Welcome Back</h2>
            <p className="text-slate-400 text-sm">Enter your credentials to access your account</p>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => handleProviderLogin(googleProvider)}
              className="flex-1 py-3 px-4 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 rounded-xl transition-all duration-200"
            >
              <FcGoogle size={20} /> <span className="text-sm font-medium">Google</span>
            </button>
            <button
              onClick={() => handleProviderLogin(githubProvider)}
              className="flex-1 py-3 px-4 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 rounded-xl transition-all duration-200"
            >
              <FaGithub size={20} /> <span className="text-sm font-medium">Github</span>
            </button>
          </div>

          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink-0 mx-4 text-slate-500 text-xs uppercase tracking-wider">Or continue with</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-6 text-sm">
              <FaExclamationCircle className="flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3.5 bg-slate-900/50 text-slate-100 rounded-xl border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all placeholder:text-slate-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full p-3.5 bg-slate-900/50 text-slate-100 rounded-xl border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all placeholder:text-slate-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <p className="text-xs text-slate-500 text-left">Must be at least 8 characters</p>
              <Link to="/auth/reset-password" className="text-xs font-medium text-sky-500 hover:text-sky-400 hover:underline transition-colors">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-400 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            >
              Sign In to Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link to="/auth/signup" className="text-sky-400 font-semibold hover:text-sky-300 hover:underline transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
