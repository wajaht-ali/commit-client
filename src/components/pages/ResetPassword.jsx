/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase";
import { Puff } from "react-loader-spinner";

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
        <div className="flex min-h-screen bg-[#111111]">
            <div className="w-full lg:w-full flex items-center justify-center p-6 sm:p-12 bg-[radial-gradient(circle_at_top,_#b48eff_0%,_#6b21a8_45%,_#000000_100%)] relative">
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
                                color="#a855f7"
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

                    <h2 className="text-2xl font-bold text-center mb-6 text-white">
                        Reset Password
                    </h2>
                    <p className="text-white mb-3 text-center">Please enter your email address to reset your password.</p>

                    {error && (
                        <motion.p
                            className="text-red-700 font-semibold text-center my-4 text-base"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {error}
                        </motion.p>
                    )}

                    <form onSubmit={handleResetPassword} className="space-y-4 mb-3">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 hover:cursor-pointer"
                        >
                            Send
                        </button>
                    </form>

                    <Link to={"/auth/login"} className="mt-4 text-sm text-gray-300 underline hover:underline-offset-4 text-center w-full mx-auto">Back to Home!</Link>

                </motion.div>
            </div>
        </div>
    );
}
