import React, { useState } from 'react';
import { FaLaptopCode, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ButtonCard from './ButtonCard';

const Navbar = ({ toggleModal }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/login');
    };

    const handleClick = () => {
        setShow(!show);
    }

    return (
        <nav className="bg-gray-800 shadow-lg sticky top-0 z-40">
            <div className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    
                    <div className="flex items-center">
                        <FaLaptopCode className="h-8 w-8 text-green-400" />
                        <h1 className="text-2xl font-bold text-white ml-2">Commit</h1>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="#" className="text-gray-300 hover:text-white">Features</Link>
                        <Link to="#" className="text-gray-300 hover:text-white">About Us</Link>
                        <Link to="#" className="text-gray-300 hover:text-white">Contact</Link>
                        <button
                            onClick={toggleModal}
                            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 hover:cursor-pointer"
                        >
                            Start Now
                        </button>
                        {/* profile icon */}
                        <div className="relative">
                            <button onDoubleClick={handleLogoClick} onClick={handleClick} className="flex items-center focus:outline-none hover:cursor-pointer hover:opacity-80">
                                <img
                                    src="https://img.icons8.com/?size=100&id=2yC9SZKcXDdX&format=png&color=22c55e"
                                    alt="Profile"
                                    className="rounded-full"
                                    style={{ width: '40px', height: '40px' }}

                                />
                            </button>
                        
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none hover:cursor-pointer">
                            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
                    <Link to="#" className="block text-gray-300 hover:text-white py-2">Features</Link>
                    <Link to="#" className="block text-gray-300 hover:text-white py-2">About Us</Link>
                    <Link to="#" className="block text-gray-300 hover:text-white py-2">Contact</Link>
                    <button
                        onClick={() => {
                            toggleModal();
                            setIsOpen(false);
                        }}
                        className="mt-2 w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Create/Join Room
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;