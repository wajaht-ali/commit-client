/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaLaptopCode, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../Firebase";
import userImg from "../../assets/user_icon.png";
import logo from "../../assets/commit_logo.png";

const Navbar = ({ toggleModal }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
    const router = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setShowProfile(false);
            router("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    const closeAllMenus = () => {
        setIsOpen(false);
        setShowProfile(false);
    };

    return (
        <nav
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent ${scrolled
                ? "bg-slate-950/80 backdrop-blur-md border-slate-800 py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex justify-between items-center">
                    <Link
                        to="/"
                        className="flex items-center gap-2 group"
                        onClick={closeAllMenus}
                    >
                        <div className="">
                            {/* <FaLaptopCode className="h-6 w-6 text-sky-400" /> */}
                            <img src={logo} alt="commit_logo" className="size-18 text-sky-400" />
                        </div>
                        {/* <span className="text-xl font-bold tracking-tight text-white">
                            Commit
                        </span> */}
                    </Link>

                    <div className="hidden md:flex items-center gap-x-1">
                        <NavLink
                            to="/features"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/5 ${isActive ? "text-sky-400 bg-white/5" : "text-slate-300 hover:text-white"
                                }`
                            }
                        >
                            Features
                        </NavLink>
                        <NavLink
                            to="/about-us"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/5 ${isActive ? "text-sky-400 bg-white/5" : "text-slate-300 hover:text-white"
                                }`
                            }
                        >
                            About Us
                        </NavLink>
                        <NavLink
                            to="/contact-us"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/5 ${isActive ? "text-sky-400 bg-white/5" : "text-slate-300 hover:text-white"
                                }`
                            }
                        >
                            Contact
                        </NavLink>
                    </div>

                    <div className="hidden md:flex items-center gap-x-4">
                        {user ? (
                            <div
                                className="relative"
                                onMouseEnter={() => setShowProfile(true)}
                                onMouseLeave={() => setShowProfile(false)}
                            >
                                <button
                                    className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-slate-700 hover:border-sky-500 cursor-pointer transition-all focus:outline-none focus:ring-4 focus:ring-sky-500/20 "
                                >
                                    <img
                                        src={user?.userData?.avatar || userImg}
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full"></span>
                                </button>

                                <div
                                    className={`absolute right-0 mt-1 w-60 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-lg shadow-xl origin-top-right transition-all duration-200 z-50 ${showProfile
                                        ? "opacity-100 scale-100 translate-y-0 visible"
                                        : "opacity-0 scale-95 -translate-y-2 invisible"
                                        }`}
                                >
                                    <div className="p-4 border-b border-slate-800">
                                        <p className="text-sm font-semibold text-white truncate">Welcome <span className="text-sky-400">{user?.userData?.name && (user.userData.name).split(" ").length > 1 ? (user.userData.name).split(" ")[0] : user?.userData?.name}</span></p>
                                    </div>
                                    <div className="p-2 space-y-1">
                                        <Link
                                            to="/profile"
                                            onClick={() => setShowProfile(false)}
                                            className="flex items-center w-full px-3 py-2 text-sm text-slate-300 rounded-lg hover:bg-slate-800 hover:text-sky-400 transition-colors cursor-pointer"
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            to="/settings"
                                            onClick={() => setShowProfile(false)}
                                            className="flex items-center w-full px-3 py-2 text-sm text-slate-300 rounded-lg hover:bg-slate-800 hover:text-sky-400 transition-colors cursor-pointer"
                                        >
                                            Settings
                                        </Link>
                                        <div className="h-px bg-slate-800 my-1"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-3 py-2 text-sm text-red-400 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate("/auth/login")}
                                    className="px-5 py-2 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-full transition-all shadow-[0_0_20px_-5px_rgba(14,165,233,0.5)] hover:shadow-[0_0_25px_-5px_rgba(14,165,233,0.6)] hover:cursor-pointer"
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-slate-300 hover:text-white transition-colors"
                        >
                            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`md:hidden fixed inset-x-0 top-[60px] p-4 transition-all duration-300 origin-top bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl ${isOpen
                    ? "opacity-100 scale-y-100 visible"
                    : "opacity-0 scale-y-95 invisible"
                    }`}
            >
                <div className="flex flex-col space-y-2">
                    <Link to="/features" className="p-3 rounded-lg text-slate-300 hover:bg-white/5 hover:text-sky-400 transition-colors" onClick={closeAllMenus}>Features</Link>
                    <Link to="/about-us" className="p-3 rounded-lg text-slate-300 hover:bg-white/5 hover:text-sky-400 transition-colors" onClick={closeAllMenus}>About Us</Link>
                    <Link to="/contact-us" className="p-3 rounded-lg text-slate-300 hover:bg-white/5 hover:text-sky-400 transition-colors" onClick={closeAllMenus}>Contact</Link>

                    <div className="h-px bg-slate-800 my-2"></div>

                    {user ? (
                        <div className="space-y-2">
                            <button
                                onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)}
                                className="w-full flex justify-between items-center p-3 rounded-lg text-slate-300 hover:bg-white/5"
                            >
                                <span className="font-medium">My Account</span>
                                <FaChevronDown className={`transition-transform ${isMobileProfileOpen ? "rotate-180" : ""}`} />
                            </button>

                            <div className={`space-y-1 pl-4 border-l border-slate-800 transition-all duration-300 ${isMobileProfileOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                                <Link to="/profile" className="block p-2 text-sm text-slate-400 hover:text-sky-400" onClick={closeAllMenus}>My Profile</Link>
                                <Link to="/settings" className="block p-2 text-sm text-slate-400 hover:text-sky-400" onClick={closeAllMenus}>Settings</Link>
                                <button onClick={handleLogout} className="w-full text-left p-2 text-sm text-red-400 hover:text-red-300">Logout</button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <button
                                onClick={() => { navigate("/auth/login"); closeAllMenus(); }}
                                className="py-2.5 text-sm font-semibold text-white bg-sky-500 rounded-lg hover:bg-sky-400 transition-colors"
                            >
                                Sign In
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
