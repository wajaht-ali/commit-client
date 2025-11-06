/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FaLaptopCode, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    const footerVariants = {
        initial: {
            opacity: 0,
            y: 30,
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: 'easeOut',
            },
        },
    };

    return (
        <motion.footer
            className="bg-slate-900 text-slate-400 border-t border-sky-500/10"
            variants={footerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div className="md:col-span-2">
                        <div className="flex items-center mb-4">
                            <FaLaptopCode className="h-8 w-8 text-sky-400" />
                            <h2 className="text-2xl font-bold text-slate-50 ml-2">Commit</h2>
                        </div>
                        <p className="text-sm max-w-md text-slate-300">
                            Your collaborative coding environment for seamless peer programming. Code in sync, learn in sync.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-slate-50 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/#features" className="hover:text-sky-400 transition-colors duration-300">Features</Link></li>
                            <li><Link to="/#about" className="hover:text-sky-400 transition-colors duration-300">About Us</Link></li>
                            <li><Link to="/#contact" className="hover:text-sky-400 transition-colors duration-300">Contact</Link></li>
                            <li><Link to="/privacy" className="hover:text-sky-400 transition-colors duration-300">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-slate-50 mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://github.com/wajaht-ali" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-sky-400 transition-colors duration-300">
                                <FaGithub className="h-6 w-6" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-sky-400 transition-colors duration-300">
                                <FaTwitter className="h-6 w-6" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-sky-400 transition-colors duration-300">
                                <FaLinkedin className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Commit. All rights reserved.</p>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;