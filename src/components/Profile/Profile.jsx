/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaLaptopCode, FaBell, FaBars, FaTimes } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

const Profile = () => {
    const router = useNavigate();
    const { user: authUser } = useAuth();
    const displayName = authUser?.userData?.name || "User";
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleNavClick = () => {
        if (isMobile) {
            closeMobileMenu();
        }
    };

    const SidebarContent = ({ onClose }) => (
        <aside className={`${isMobile ? "w-full h-full" : "w-64"} bg-gray-800 flex flex-col shrink-0`}>
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div
                        className="flex items-center gap-2 hover:cursor-pointer group"
                        onClick={() => {
                            router("/");
                            if (isMobile) closeMobileMenu();
                        }}
                    >
                        <FaLaptopCode className="h-8 w-8 text-sky-400 group-hover:scale-110 transition-transform duration-300" />
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            Commit
                        </h1>
                    </div>
                    {isMobile && onClose && (
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                            aria-label="Close menu"
                        >
                            <FaTimes className="h-6 w-6" />
                        </button>
                    )}
                </div>
                <hr className="border-t border-gray-700 mb-4" />
                <nav className="flex-1">
                    <ul className="space-y-1">
                        <li>
                            <NavLink
                                to="/profile"
                                end
                                onClick={handleNavClick}
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2.5 rounded-lg transition-colors ${isActive
                                        ? "bg-gray-700 text-sky-400 font-medium"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }`
                                }
                            >
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/profile/dashboard"
                                onClick={handleNavClick}
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2.5 rounded-lg transition-colors ${isActive
                                        ? "bg-gray-700 text-sky-400 font-medium"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }`
                                }
                            >
                                <RxDashboard className="h-5 w-5 mr-3" />
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/profile/organization"
                                onClick={handleNavClick}
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2.5 rounded-lg transition-colors ${isActive
                                        ? "bg-gray-700 text-sky-400 font-medium"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }`
                                }
                            >
                                Organization
                            </NavLink>
                        </li>
                        <li>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick();
                                }}
                                className="w-full flex items-center px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors text-left"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="mt-auto p-4 lg:p-6 border-t border-gray-700">
                <div className="text-xs lg:text-sm text-gray-400 text-center">
                    &copy; 2025 Commit. All rights reserved.
                </div>
            </div>
        </aside>
    );

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gray-900 text-white font-sans overflow-hidden">
            {/* Desktop Sidebar */}
            {!isMobile && (
                <SidebarContent />
            )}

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobile && isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeMobileMenu}
                            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 h-full w-full max-w-xs z-50 lg:hidden shadow-2xl"
                        >
                            <SidebarContent onClose={closeMobileMenu} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between bg-gray-800 border-b border-gray-700 px-4 py-3 lg:px-6 lg:py-4 shrink-0">
                    <div className="flex items-center gap-3 lg:gap-4">
                        {isMobile && (
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                aria-label="Open menu"
                            >
                                <FaBars className="h-6 w-6" />
                            </button>
                        )}
                        <div className="text-base lg:text-lg font-semibold truncate">
                            Welcome, <span className="text-sky-400">{displayName}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 lg:gap-4">
                        <button
                            className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors hover:cursor-pointer"
                            aria-label="Notifications"
                        >
                            <FaBell className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-3 sm:p-4 lg:p-6">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
