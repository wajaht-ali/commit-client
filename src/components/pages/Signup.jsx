import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaExclamationCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ClipLoader } from "react-spinners";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../../Firebase.js";
import { useAuth } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { getAuthErrorMessage } from "../../utils/Utilities.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const syncUserWithBackend = async (firebaseUser, displayName = null) => {
  const res = await axios.post(`${API_URL}/api/v1/user/googleSignup`, {
    name: displayName || firebaseUser.displayName || firebaseUser.email?.split("@")[0],
    email: firebaseUser.email,
    avatar: firebaseUser.photoURL || "",
  });
  return res.data;
};

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const backendData = await syncUserWithBackend(userCred.user, name);

      if (!backendData.success) {
        toast.error(backendData.message);
        setError(backendData.message);
        return;
      }

      setUser(backendData.userData);
      toast.success("Account created successfully!");
      window.location.replace("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Account already exists.");
        return;
      }

      const message = getAuthErrorMessage(err.code);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const backendData = await syncUserWithBackend(result.user);

      if (!backendData.success) {
        toast.error(backendData.message);
        setError(backendData.message);
        return;
      }

      setUser(backendData.userData);
      toast.success("Welcome to Commit!");
      window.location.replace("/");
    } catch (err) {
      const message = getAuthErrorMessage(err.code);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-slate-950 z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] z-0"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sky-600/10 rounded-full blur-[100px] z-0"></div>

        <div className="relative z-10 max-w-lg text-center fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-50 leading-tight">
            Start Your Journey <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">
              With Commit
            </span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Create your account today and unlock a world of seamless, real-time code collaboration.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-slate-950 lg:bg-slate-950/50">
        <div className="lg:hidden absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-2xl border border-slate-800/60 shadow-2xl relative fade-in-up delay-100">
          {loading && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-50 rounded-2xl flex flex-col items-center justify-center transition-opacity duration-300">
              <ClipLoader color="#A855F7" size={50} />
              <p className="mt-4 text-slate-300 font-medium animate-pulse">Creating Account...</p>
            </div>
          )}

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-50 mb-2">Create Account</h2>
            <p className="text-slate-400 text-sm">Join us and start coding together</p>
          </div>

          <button
            onClick={handleGoogleSignup}
            className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 rounded-xl transition-all duration-200 mb-6"
          >
            <FcGoogle size={20} />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>

          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink-0 mx-4 text-slate-500 text-xs uppercase tracking-wider">
              Or register with email
            </span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {error && (
            <div className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-6 text-sm">
              <FaExclamationCircle className="flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleEmailSignup} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 ml-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-3.5 bg-slate-900/50 text-slate-100 rounded-xl border border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-slate-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3.5 bg-slate-900/50 text-slate-100 rounded-xl border border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-slate-600"
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
                  placeholder="Create a password"
                  className="w-full p-3.5 bg-slate-900/50 text-slate-100 rounded-xl border border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-slate-600"
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

            <p className="text-xs text-slate-500 pt-1">Must be at least 8 characters</p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            >
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-purple-400 font-semibold hover:text-purple-300 hover:underline transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
