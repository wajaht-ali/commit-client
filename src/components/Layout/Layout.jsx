import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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
        <div className="bg-slate-900 text-slate-200 min-h-screen">
            <Navbar
                user={user}
                toggleModal={toggleModal}
                handleLogout={handleLogout}
            />

            <main>
                <Outlet context={{ user, toggleModal }} />
            </main>

            <Footer />
            <AnimatePresence>
                {isModalOpen && (
                    <RoomModal
                        isVisible={isModalOpen}
                        toggleModal={toggleModal}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Layout;