/* eslint-disable no-unused-vars */

import { Link } from 'react-router-dom';
import wajahat from "../../assets/Wajahat_Ali_Profile.jpg";
import hammad from '../../assets/hammad_dev.jpeg';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdMailOutline } from "react-icons/md";

const AboutUs = () => {
    return (
        <div className="min-h-screen pt-24 pb-20 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Hero Section */}
                <section className="text-center mb-24 fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-semibold mb-6">
                        Our Mission
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-8 text-slate-50">
                        Simplifying How <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">Developers Create Together.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Code Commit was born from the idea that seamless collaboration is the cornerstone of great software.
                        Our platform provides a real-time, intuitive, and powerful coding environment designed to bring developers together.
                    </p>
                </section>

                {/* Team Section */}
                <section className="mb-24 fade-in-up delay-200">
                    <h2 className="text-3xl font-bold text-center mb-16 text-slate-50 flex flex-col items-center">
                        Meet the Developers
                        <span className="w-20 h-1 bg-sky-500 mt-4 rounded-full"></span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">

                        {/* Developer 1 */}
                        <div className="group relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-sky-500/30 transition-all duration-300 hover:bg-slate-800/60 text-center">
                            <div className="relative inline-block mb-6">
                                <div className="absolute inset-0 bg-sky-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                <img
                                    src={wajahat}
                                    alt="Client-Side Developer"
                                    className="relative w-32 h-32 rounded-full border-4 border-slate-800 group-hover:border-sky-500 transition-colors duration-300 object-cover"
                                />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-1">Wajahat Ali</h3>
                            <p className="text-sky-400 font-medium mb-4">Software Engineer @ mimAR Studios</p>

                            <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                                Manages the backbone of Code Commit's real-time functionality, ensuring a secure, scalable, and lightning-fast environment.
                            </p>

                            <div className="flex justify-center items-center space-x-4">
                                <a href="https://linkedin.com/in/wajhat-ali/" target='_blank' rel="noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-sky-500 hover:text-white transition-all duration-300">
                                    <FaLinkedin size={20} />
                                </a>
                                <a href="https://github.com/wajaht-ali/" target='_blank' rel="noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-sky-500 hover:text-white transition-all duration-300">
                                    <FaGithub size={20} />
                                </a>
                                <a href="mailto:contact.chwajahat@gmail.com" target='_blank' rel="noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-sky-500 hover:text-white transition-all duration-300">
                                    <MdMailOutline size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Developer 2 */}
                        <div className="group relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-sky-500/30 transition-all duration-300 hover:bg-slate-800/60 text-center">
                            <div className="relative inline-block mb-6">
                                <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                <img
                                    src={hammad}
                                    alt="Server-Side Developer"
                                    className="relative w-32 h-32 rounded-full border-4 border-slate-800 group-hover:border-purple-500 transition-colors duration-300 object-cover"
                                />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-1">Hammad Ali</h3>
                            <p className="text-purple-400 font-medium mb-4">Frontend Engineer</p>

                            <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                                The architect of the user experience you see and interact with, crafting a front-end that is both powerful and easy to use.
                            </p>

                            <div className="flex justify-center items-center space-x-4">
                                <a href="https://linkedin.com/in/hammad-swe/" target='_blank' rel="noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-purple-500 hover:text-white transition-all duration-300">
                                    <FaLinkedin size={20} />
                                </a>
                                <a href="https://github.com/hammad-swe/" target='_blank' rel="noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-purple-500 hover:text-white transition-all duration-300">
                                    <FaGithub size={20} />
                                </a>
                                <a href="mailto:hammadali78056@gmail.com" target='_blank' rel="noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-purple-500 hover:text-white transition-all duration-300">
                                    <MdMailOutline size={20} />
                                </a>
                            </div>
                        </div>

                    </div>
                </section>

                {/* CTA */}
                <section className="text-center fade-in-up delay-300">
                    <div className="bg-gradient-to-r from-sky-500/10 to-purple-500/10 rounded-3xl p-12 border border-white/5 backdrop-blur-sm">
                        <h2 className="text-3xl font-bold mb-6 text-slate-100">Ready to Start Collaborating?</h2>
                        <Link
                            to="/"
                            className="inline-block bg-sky-500 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-400 transition-all shadow-lg hover:shadow-sky-500/25 hover:-translate-y-1"
                        >
                            Go to Editor
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default AboutUs;