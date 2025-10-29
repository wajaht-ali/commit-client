/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email) {
            toast.error('Please enter your registered email address.');
            setLoading(false);
            return;
        }

        try {
            let res = await axios.post(`${API_URL}/api/v1/user/reset-password`, { email })
            if (res.data.success) {
                toast.success(res.data.message || 'Password reset email sent. Please check your inbox.');
                setTimeout(() => navigate('/auth/login'), 2000);
            }
        } catch (err) {
            if (err.code === 'auth/invalid-email') {
                toast.error('Invalid email format.');
            } else if (err.code === 'auth/user-not-found') {
                toast.error('No account found for this email address.');
            } else {
                toast.error(err.response.data.message || 'Something went wrong. Please try again later.');
            }
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

            <motion.div
                className="relative w-full max-w-md p-8 m-6 lg:m-auto bg-gray-700 shadow-2xl rounded-2xl backdrop-blur-lg"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-white">
                    Reset Password
                </h2>
                <p className="text-white mb-2 text-center">Please enter your email address to reset your password.</p>
                <form onSubmit={handleResetPassword} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition hover:cursor-pointer"
                        disabled={loading}
                    >
                        Send
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
}
