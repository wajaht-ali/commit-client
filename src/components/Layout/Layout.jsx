import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbatr';
import Footer from './Footer';
import RoomModal from '../ui/RoomModal';

const Layout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Navbar toggleModal={toggleModal} />
            <main>
                <Outlet context={{ toggleModal }} />
            </main>
            <Footer />

            {isModalOpen && <RoomModal toggleModal={toggleModal} />}
        </div>
    );
};

export default Layout;