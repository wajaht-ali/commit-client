/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase";
import { ClipLoader } from "react-spinners";
import { FaExclamationCircle, FaLaptopCode } from "react-icons/fa";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email.trim()) {
            toast.error("Please enter your registered email address.");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(`${API_URL}/api/v1/user/reset-password`, { email });

            if (res.data.success) {
                await sendPasswordResetEmail(auth, email);
                toast.success("Password reset link sent. Check your inbox (or spam folder).");
                setTimeout(() => navigate("/auth/login"), 2000);
            }
        } catch (err) {
            const apiMessage = err?.response?.data?.message;

            switch (apiMessage) {
                case "No account found with this email address.":
                    toast.error(apiMessage);
                    setError(apiMessage);
                    break;
                default:
                    toast.error(apiMessage || "Something went wrong. Please try again later.");
                    setError(apiMessage || "Something went wrong. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Left Side - Hero / Decor */}
            <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden">
                {/* Animated Background Glows */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-lg text-center">
                    <div className="mb-6">
                        {/* <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-500/10 border border-sky-500/30 mb-6">
                            <FaLaptopCode className="h-8 w-8 text-sky-400" />
                        </div> */}
                    </div>
                    <h2 className="text-5xl lg:text-6xl font-bold mb-4 text-slate-50 leading-tight">
                        Recover Your<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-300">Account</span>
                    </h2>
                    <p className="text-lg text-slate-300 leading-relaxed">
                        We'll help you regain access to your account with a secure password reset link.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
                {/* Mobile Background Glow */}
                <div className="lg:hidden absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>
                </div>

                <div className="w-full max-w-md relative z-10">
                    {/* Card with Glass Morphism Effect */}
                    <div className="p-8 sm:p-10 rounded-2xl border border-slate-700/50 backdrop-blur-xl bg-slate-900/40 shadow-2xl">

                        {loading && (
                            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-50 rounded-2xl flex flex-col items-center justify-center">
                                <div className="flex flex-col items-center">
                                    <ClipLoader color="#0EA5E9" size={60} />
                                    <p className="mt-6 text-slate-200 font-medium text-sm">Sending reset link...</p>
                                    <p className="text-slate-400 text-xs mt-2">Please wait a moment</p>
                                </div>
                            </div>
                        )}

                        {/* Header */}
                        <div className="text-center mb-10">
                            <div className="inline-flex lg:hidden items-center justify-center w-14 h-14 rounded-full bg-sky-500/10 border border-sky-500/30 mb-4">
                                <svg className="w-7 h-7 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7h4a2 2 0 012 2v10a2 2 0 01-2 2h-4m0 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v14m4-7h2m2 0a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-50 mb-3">Reset Password</h2>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Enter your email address and we'll send you a link to create a new password.
                            </p>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-300 p-4 rounded-xl mb-6 text-sm">
                                <FaExclamationCircle className="flex-shrink-0 mt-0.5 text-red-400" />
                                <p>{error}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleResetPassword} className="space-y-6">
                            <div>
                                <label className="text-xs font-semibold text-slate-300 ml-1 block mb-2 uppercase tracking-wide">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-3.5 bg-slate-800/50 text-slate-100 rounded-xl border border-slate-700/60 hover:border-slate-600/60 focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all duration-200 placeholder:text-slate-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold py-3.5 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transform hover:-translate-y-1 active:translate-y-0 hover:cursor-pointer"
                            >
                                Send Reset Link
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-8">
                            <div className="flex-grow border-t border-slate-700/50"></div>
                            <span className="px-3 text-xs text-slate-500 uppercase tracking-wider">or</span>
                            <div className="flex-grow border-t border-slate-700/50"></div>
                        </div>

                        {/* Footer Link */}
                        <p className="text-center text-sm text-slate-400">
                            Remember your password?{' '}
                            <Link
                                to="/auth/login"
                                className="text-sky-400 font-semibold hover:text-sky-300 hover:underline underline-offset-2 transition-colors duration-200"
                            >
                                Sign In
                            </Link>
                        </p>

                        <p className="text-center text-xs text-slate-500 mt-6">
                            Don't have an account?{' '}
                            <Link
                                to="/auth/signup"
                                className="text-sky-400 font-semibold hover:text-sky-300 hover:underline underline-offset-2 transition-colors hover:cursor-pointer"
                            >
                                Create one
                            </Link>
                        </p>
                    </div>

                    {/* Security Note */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Your account is secure and protected
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
