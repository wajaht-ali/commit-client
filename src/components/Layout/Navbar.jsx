/* eslint-disable no-unused-vars */

"use client";

import { useState } from "react";
import { FaLaptopCode, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../Firebase";

const Navbar = ({ toggleModal }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const router = useNavigate();
    const toggleMenu = () => setIsOpen(!isOpen);
    const { user, setUser } = useAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setShowProfile(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <motion.nav
            className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-gray-900/70 border-b border-gray-800"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div
                    className="flex items-center gap-2 hover:cursor-pointer group"
                    onClick={() => router("/")}
                >
                    <FaLaptopCode className="h-8 w-8 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        Commit
                    </h1>
                </div>

                <div className="hidden md:flex items-center space-x-8">
                    <Link
                        href="#features"
                        className="text-gray-300 hover:text-green-400 transition duration-300"
                    >
                        Features
                    </Link>
                    <Link
                        href="#about"
                        className="text-gray-300 hover:text-green-400 transition duration-300"
                    >
                        About Us
                    </Link>
                    <Link
                        href="#contact"
                        className="text-gray-300 hover:text-green-400 transition duration-300"
                    >
                        Contact
                    </Link>

                    {
                        user && <button
                            onClick={toggleModal}
                            className="px-5 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 hover:cursor-pointer active:scale-95 transition-all duration-300"
                        >
                            Start Now
                        </button>
                    }

                    {!user ? (
                        <button
                            onClick={() => router("/auth/login")}
                            className="px-5 py-2 border border-green-500 text-green-400 font-semibold rounded-lg hover:bg-green-500 hover:text-white active:scale-95 transition-all duration-300 hover:cursor-pointer"
                        >
                            Sign In
                        </button>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setShowProfile(!showProfile)}
                                className="flex items-center hover:opacity-80 transition hover:cursor-pointer"
                            >
                                <img
                                    src="https://img.icons8.com/?size=100&id=2yC9SZKcXDdX&format=png&color=22c55e"
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full"
                                />
                            </button>

                            <AnimatePresence>
                                {showProfile && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-3 w-40 bg-gray-800 rounded-lg shadow-lg border border-gray-700"
                                    >
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-t-lg"
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            href="/settings"
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                        >
                                            Settings
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 rounded-b-lg hover:cursor-pointer"
                                        >
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-300 hover:text-white focus:outline-none"
                    >
                        {isOpen ? (
                            <FaTimes className="h-6 w-6" />
                        ) : (
                            <FaBars className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden bg-gray-900/90 backdrop-blur-xl border-t border-gray-800 shadow-lg px-6 py-4 space-y-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link
                            href="#features"
                            className="block text-gray-300 hover:text-green-400 transition"
                            onClick={toggleMenu}
                        >
                            Features
                        </Link>
                        <Link
                            href="#about"
                            className="block text-gray-300 hover:text-green-400 transition"
                            onClick={toggleMenu}
                        >
                            About Us
                        </Link>
                        <Link
                            href="#contact"
                            className="block text-gray-300 hover:text-green-400 transition"
                            onClick={toggleMenu}
                        >
                            Contact
                        </Link>

                        <button
                            onClick={() => {
                                toggleModal();
                                setIsOpen(false);
                            }}
                            className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-300"
                        >
                            Start Now
                        </button>

                        {!user ? (
                            <button
                                onClick={() => {
                                    router("/auth/login");
                                    setIsOpen(false);
                                }}
                                className="w-full py-2 border border-green-500 text-green-400 font-semibold rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300"
                            >
                                Sign In
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="w-full py-2 border border-red-500 text-red-400 font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                            >
                                Logout
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;


