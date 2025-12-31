import { FaLaptopCode } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { MdArrowDropUp } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Profile = () => {
    const router = useNavigate();
    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gray-900 text-white font-sans">
            <aside className="w-full lg:w-64 bg-gray-800 p-4 flex flex-col shrink-0">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div
                        className="flex items-center gap-2 hover:cursor-pointer group"
                        onClick={() => router("/")}
                    >
                        <FaLaptopCode className="h-8 w-8 text-sky-400 group-hover:scale-110 transition-transform duration-300" />
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            Commit
                        </h1>
                    </div>
                </div>
                <hr className="border-t border-gray-700 my-4" />
                <nav className="flex-1">
                    <ul className="space-y-2">
                        <li>
                            {/* Demo active class nav link */}
                            {/* <NavLink href="#" className={({ isActive }) => isActive ? "block p-2 rounded-lg hover:bg-gray-700" : ""}>
                                {" "}
                                <RxDashboard className="h-5 w-5 inline-block mr-2" />
                                Dashboard
                            </NavLink> */}
                            <NavLink href="#" className={({ isActive }) => isActive ? "block p-2 rounded-lg hover:bg-gray-700" : ""}>
                                {" "}
                                <RxDashboard className="h-5 w-5 inline-block mr-2" />
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink href="#" className={({ isActive }) => isActive ? "block p-2 rounded-lg hover:bg-gray-700" : ""}>
                                Organization
                            </NavLink>
                        </li>
                        <li>
                            <NavLink href="#" className={({ isActive }) => isActive ? "block p-2 rounded-lg hover:bg-gray-700" : ""}>
                                Logout
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="mt-4 flex  items-center w-full  bg-slate-800/50 backdrop-blur-lg border border-slate-700/80 rounded-lg text-white px-4 py-2 rounded-lg">
                    <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden border-4 border-blue-500">
                        <img
                            src="https://img.icons8.com/?size=100&id=2yC9SZKcXDdX&format=png&color=22c55e"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <button className="ml-4">
                        View Profile
                        <MdArrowDropUp className="h-5 w-5 inline-block ml-4" />
                    </button>
                </div>
                <div className="mt-auto">
                    <hr className="border-t border-gray-700 my-4" />
                    <div className="text-sm text-gray-400">
                        &copy; 2025 Commit. All rights reserved.
                    </div>
                </div>
            </aside>

            <main className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
                <header className="flex items-center justify-between mb-2  bg-slate-800/50 backdrop-blur-lg border border-slate-700/80 rounded-[40px] p-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-1/3 p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
                    />
                    <div className="flex items-center space-x-4">
                        <button className="px-8 py-3 font-bold text-white bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-sky-500/20 hover:cursor-pointer">
                            Notifications
                        </button>
                    </div>
                </header>
                <h1 className="text-2xl font-bold mb-2">My Profile</h1>
                <section className="flex  bg-gray-800 p-4 rounded-xl ">
                    <div className="flex flex-row items-left">
                        {/* image input */}
                        <div className="w-20 h-20 bg-gray-700 rounded-full overflow-hidden border-4 border-blue-500">
                            <img
                                src="https://img.icons8.com/?size=100&id=2yC9SZKcXDdX&format=png&color=22c55e"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="ml-6">
                            <h2 className="text-lg font-bold mb-2">Hammad Ali</h2>
                            <p className="text-gray-300 mb-4">
                                Full Stack Developer at TechCorp
                            </p>
                        </div>
                    </div>
                </section>

                <section className="flex overflow-y-auto bg-gray-800 p-4 rounded-xl">
                    <div className="w-full">
                        <div className="flex  items-center justify-between">
                            <h3 className="text-lg font-semibold mb-2">
                                Personal Information
                            </h3>
                            <button className="mb-4 px-8 py-3 font-bold text-white bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-sky-500/20 hover:cursor-pointer">
                                Edit{" "}
                            </button>
                        </div>
                        <hr className="border-t border-gray-700 mb-4" />
                        <div className="space-y-4 grid grid-cols-3 gap-4">
                            <div>
                                <h4 className="font-semibold">First Name</h4>
                                <p className="text-gray-300">Hammad</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Last Name</h4>
                                <p className="text-gray-300">Ali</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Email</h4>
                                <p className="text-gray-300">hammad.ali@example.com</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Phone</h4>
                                <p className="text-gray-300">+123456789</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Profile;
