import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import RoomModal from '../ui/RoomModal';

const Layout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleLogout = () => {
        setUser(null);
        console.log("User logged out");
    };

    return (
        <div className="bg-slate-950 min-h-screen flex flex-col relative overflow-x-hidden">
            
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar
                    user={user}
                    toggleModal={toggleModal}
                    handleLogout={handleLogout}
                />

                <main className="flex-grow">
                    <Outlet context={{ user, toggleModal }} />
                </main>

                <Footer />
            </div>

            {isModalOpen && (
                <RoomModal
                    isVisible={isModalOpen}
                    toggleModal={toggleModal}
                />
            )}
        </div>
    );
};

export default Layout;