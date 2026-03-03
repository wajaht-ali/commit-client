/* eslint-disable no-unused-vars */
import { FaLaptopCode, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../../assets/commit_logo.png";


const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/50 relative overflow-hidden">
            {/* Decorative Top Glow */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"></div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

                    <div className="md:col-span-2 space-y-4">
                        <Link to="/" className="flex items-center gap-2 group w-fit">
                            {/* <div className="p-2 rounded-lg bg-sky-500/10 group-hover:bg-sky-500/20 transition-colors">
                                <FaLaptopCode className="h-6 w-6 text-sky-400" />
                            </div> */}
                            <div className="">
                                {/* <FaLaptopCode className="h-6 w-6 text-sky-400" /> */}
                                <img src={logo} alt="commit_logo" className="size-18 text-sky-400" />
                            </div>
                            {/* <span className="text-xl font-bold tracking-tight text-white">
                                Commit
                            </span> */}
                        </Link>
                        <p className="text-sm max-w-sm text-slate-400 leading-relaxed">
                            The browser-based pair programming tool with integrated audio.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Product</h3>
                        <ul className="space-y-3">
                            <li><Link to="/features" className="hover:text-sky-400 transition-colors duration-200">Features</Link></li>
                            <li><Link to="/about-us" className="hover:text-sky-400 transition-colors duration-200">About Us</Link></li>
                            <li><Link to="/contact-us" className="hover:text-sky-400 transition-colors duration-200">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="https://github.com/wajaht-ali" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center hover:border-sky-500 hover:text-sky-500 transition-all duration-300">
                                <FaGithub className="h-5 w-5" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center hover:border-sky-500 hover:text-sky-500 transition-all duration-300">
                                <FaTwitter className="h-5 w-5" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center hover:border-sky-500 hover:text-sky-500 transition-all duration-300">
                                <FaLinkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Commit. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;