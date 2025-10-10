import { FaLaptopCode, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-400">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div>
                        <div className="flex items-center mb-4">
                            <FaLaptopCode className="h-8 w-8 text-green-400" />
                            <h2 className="text-2xl font-bold text-white ml-2">Commit</h2>
                        </div>
                        <p className="text-sm">
                            Your collaborative coding environment for seamless peer programming. Code in sync, learn in sync.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul>
                            <li className="mb-2"><Link to="#features" className="hover:text-white">Features</Link></li>
                            <li className="mb-2"><Link to="#about" className="hover:text-white">About Us</Link></li>
                            <li className="mb-2"><Link to="#contact" className="hover:text-white">Contact</Link></li>
                            <li className="mb-2"><Link to="#" className="hover:text-white">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <Link to="https://github.com/wajaht-ali" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                <FaGithub className="h-6 w-6" />
                            </Link>
                            <Link to="#" className="hover:text-white">
                                <FaTwitter className="h-6 w-6" />
                            </Link>
                            <Link to="#" className="hover:text-white">
                                <FaLinkedin className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
                    <p>&copy; 2025 Commit. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;