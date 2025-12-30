/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaLaptopCode, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../Firebase";

const Navbar = ({ toggleModal }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setShowProfile(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    const closeAllMenus = () => {
        setIsOpen(false);
        setShowProfile(false);
    };

    return (
        <>
            <motion.div
                className="fixed top-4 inset-x-0 z-50 flex justify-center"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="w-full max-w-6xl mx-4">
                    <nav className="relative w-full bg-slate-800/50 backdrop-blur-lg border border-slate-700/80 rounded-[40px] shadow-lg">
                        <div className="px-6 py-3 flex justify-between items-center">
                            <div
                                className="flex items-center gap-2 hover:cursor-pointer group"
                                onClick={() => navigate("/")}
                            >
                                <FaLaptopCode className="h-7 w-7 text-sky-400 group-hover:scale-110 transition-transform duration-300" />
                                <h1 className="text-xl font-bold text-slate-50 tracking-tight hidden sm:block">
                                    Commit
                                </h1>
                            </div>

                            <div className="hidden md:flex items-center gap-x-8">
                                {/* <Link to="/features" className="text-slate-300 hover:text-sky-400 transition-colors duration-300">
                                    Features
                                </Link> */}
                                <NavLink
                                    to="/features"
                                    className={({ isActive }) =>
                                        `transition-colors duration-300 hover:text-sky-400 ${isActive ? "text-sky-400" : "text-slate-300"
                                        }`
                                    }>
                                    Features
                                </NavLink>
                                <NavLink
                                    to="/about-us"
                                    className={({ isActive }) =>
                                        `transition-colors duration-300 hover:text-sky-400 ${isActive ? "text-sky-400" : "text-slate-300"
                                        }`
                                    }>
                                    About Us
                                </NavLink>
                                <NavLink
                                    to="/contact-us"
                                    className={({ isActive }) =>
                                        `transition-colors duration-300 hover:text-sky-400 ${isActive ? "text-sky-400" : "text-slate-300"
                                        }`
                                    }>
                                    Contact
                                </NavLink>
                            </div>

                            <div className="hidden md:flex items-center gap-x-4">
                                {user ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowProfile(!showProfile)}
                                            className="flex items-center hover:cursor-pointer"
                                        >
                                            <img
                                                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=0EA5E9&color=fff`}
                                                alt="Profile"
                                                className="w-9 h-9 rounded-full ring-2 ring-transparent hover:ring-sky-500 transition-all"
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {showProfile && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute right-0 mt-3 w-48 bg-slate-800 rounded-lg shadow-2xl border border-slate-700"
                                                >
                                                    <div className="p-2">
                                                        <Link to="/profile" onClick={() => setShowProfile(false)} className="block px-4 py-2 text-sm text-slate-300 hover:bg-sky-500/20 hover:text-slate-50 rounded-md">My Profile</Link>
                                                        <Link to="/settings" onClick={() => setShowProfile(false)} className="block px-4 py-2 text-sm text-slate-300 hover:bg-sky-500/20 hover:text-slate-50 rounded-md">Settings</Link>
                                                        <div className="border-t border-slate-700 my-1"></div>
                                                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-md">Logout</button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <>
                                        <button onClick={() => navigate("/")} className="px-5 py-2 text-sm font-semibold text-slate-200 bg-slate-700/50 border border-slate-600 rounded-full hover:bg-slate-700 hover:cursor-pointer transition-colors duration-300">
                                            Enterprise
                                        </button>
                                        <button onClick={() => navigate("/auth/login")} className="px-5 py-2 text-sm font-semibold text-white rounded-full transition-colors duration-300 hover:cursor-pointer bg-gradient-to-r from-sky-400 to-sky-600">
                                            Login
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="md:hidden">
                                <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white focus:outline-none">
                                    {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                                </button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    className="md:hidden absolute top-full left-0 w-full mt-2"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <div className="mx-4 p-4 bg-slate-800/80 backdrop-blur-lg border border-slate-700 rounded-2xl">
                                        <div className="flex flex-col space-y-4">
                                            <Link to="/#features" className="text-slate-300 hover:text-sky-400" onClick={closeAllMenus}>Features</Link>
                                            <Link to="/#about" className="text-slate-300 hover:text-sky-400" onClick={closeAllMenus}>About Us</Link>
                                            <Link to="/#contact" className="text-slate-300 hover:text-sky-400" onClick={closeAllMenus}>Contact</Link>
                                            <div className="border-t border-slate-700 pt-4 flex flex-col space-y-4">
                                                {user ? (
                                                    <>
                                                        <button onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)} className="w-full flex justify-between items-center text-left font-semibold text-slate-300">My Account<motion.span animate={{ rotate: isMobileProfileOpen ? 180 : 0 }}><FaChevronDown /></motion.span></button>
                                                        <AnimatePresence>
                                                            {isMobileProfileOpen && (
                                                                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="pl-4 flex flex-col space-y-2 border-l-2 border-sky-600/20 overflow-hidden">
                                                                    <Link to="/profile" className="text-slate-400 hover:text-sky-300" onClick={closeAllMenus}>My Profile</Link>
                                                                    <Link to="/settings" className="text-slate-400 hover:text-sky-300" onClick={closeAllMenus}>Settings</Link>
                                                                    <button onClick={handleLogout} className="text-left text-red-500 hover:text-red-400">Logout</button>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </>
                                                ) : (
                                                    <button onClick={() => { navigate("/auth/login"); closeAllMenus(); }} className="w-full text-center py-2 font-semibold text-sky-400 border border-sky-400 rounded-lg hover:bg-sky-500 hover:text-white transition-all">
                                                        Sign In
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </nav>
                </div>
            </motion.div>
        </>
    );
};

export default Navbar;


