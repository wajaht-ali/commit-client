import React from 'react'
import { FaUsers, FaTimes } from "react-icons/fa";

function ProfileSideBar = ({
    isMobile,
    isCollapsed,
    connectedUsers,

}) => {
    if (!isMobile && isCollapsed) {
            return (
                <div className="bg-[#161b22] h-full p-2 flex flex-col items-center justify-between border-r border-[#30363d]">
                    <div className="flex flex-col items-center gap-6 mt-2">
                        <div className="text-xl font-bold text-white">C</div>
                        <div className="relative group">
                            <FaUsers size={20} className="text-neutral-400" />
                            <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {/* {connectedUsers.length} Users */}
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
    
  return (
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
                            <a href="#" className="block p-2 rounded-lg hover:bg-gray-700">
                                {" "}
                                <RxDashboard className="h-5 w-5 inline-block mr-2" />
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block p-2 rounded-lg hover:bg-gray-700">
                                Organization
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block p-2 rounded-lg hover:bg-gray-700">
                                Logout
                            </a>
                        </li>
                    </ul>
                </nav>
                {/* Profile button with dropup of logout button and settings and password change */}
                <div className="mt-4 flex  items-center w-full  bg-slate-800/50 backdrop-blur-lg border border-slate-700/80 rounded-[40px] text-white px-4 py-2 rounded-lg">
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
  )
};
export default ProfileSideBar;

