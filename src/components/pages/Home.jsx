/* eslint-disable no-unused-vars */
import { useOutletContext } from 'react-router-dom';
import { FaCode, FaUsers, FaLaptopCode, FaRocket, FaGlobe, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from "../../context/AuthContext";

const HomePage = () => {
    const { user } = useAuth();
    const { toggleModal } = useOutletContext();

    return (
        <div className="font-sans text-slate-50">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <div className="fade-in-up">
                            <span className="inline-block py-1 px-3 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-semibold mb-6">
                                v2.0 is now live
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 fade-in-up delay-100">
                            Code your commitments, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400">
                                Live & Sync.
                            </span>
                        </h1>

                        <p className="max-w-2xl text-lg md:text-xl text-slate-400 mb-10 fade-in-up delay-200">
                            A shared coding space built for dedicated partnership and deep focus.
                            Experience the seamless, real-time environment designed for modern developers.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 fade-in-up delay-300">
                            {user?.userData ? (
                                <button
                                    onClick={toggleModal}
                                    className="px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_40px_-10px_rgba(14,165,233,0.5)] hover:shadow-[0_0_60px_-10px_rgba(14,165,233,0.6)] hover:-translate-y-1"
                                >
                                    Create or Join Room
                                </button>
                            ) : (
                                <button
                                    onClick={() => window.location.href = '/auth/login'}
                                    className="px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_40px_-10px_rgba(14,165,233,0.5)] hover:shadow-[0_0_60px_-10px_rgba(14,165,233,0.6)] hover:-translate-y-1"
                                >
                                    Get Started
                                </button>
                            )}
                            <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 rounded-full font-semibold text-lg transition-all backdrop-blur-sm">
                                View Demo
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose Commit?</h2>
                        <p className="text-slate-400 text-lg">Built for speed, reliability, and seamless collaboration.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <div className="group p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:bg-slate-800/50 hover:border-sky-500/20 transition-all duration-300">
                            <div className="h-12 w-12 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <FaCode className="text-2xl text-sky-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-100">Real-time Collaboration</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Work with peers in a shared environment. See changes live and learn from each other's approaches instantly.
                            </p>
                        </div>

                        <div className="group p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:bg-slate-800/50 hover:border-purple-500/20 transition-all duration-300">
                            <div className="h-12 w-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <FaUsers className="text-2xl text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-100">Enhanced Learning</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Accelerate your learning by observing how others solve problems. Get instant feedback and share knowledge.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:bg-slate-800/50 hover:border-teal-500/20 transition-all duration-300">
                            <div className="h-12 w-12 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <FaLaptopCode className="text-2xl text-teal-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-100">Efficient Problem Solving</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Two heads are better than one. Tackle complex problems more effectively and produce higher quality code.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-slate-900/30 border-y border-white/5">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
                        <p className="text-slate-400 text-lg">Get started in seconds, not minutes.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-sky-500/0 via-sky-500/20 to-sky-500/0"></div>

                        <div className="relative text-center group">
                            <div className="relative z-10 w-24 h-24 mx-auto bg-slate-900 rounded-full border border-slate-700 flex items-center justify-center mb-6 group-hover:border-sky-500/50 transition-colors shadow-xl">
                                <span className="text-3xl font-bold text-sky-500">1</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-slate-200">Create a Room</h3>
                            <p className="text-slate-400">Generate a new secure code room with one click.</p>
                        </div>

                        <div className="relative text-center group">
                            <div className="relative z-10 w-24 h-24 mx-auto bg-slate-900 rounded-full border border-slate-700 flex items-center justify-center mb-6 group-hover:border-purple-500/50 transition-colors shadow-xl">
                                <span className="text-3xl font-bold text-purple-500">2</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-slate-200">Invite Peer</h3>
                            <p className="text-slate-400">Share your unique room ID with your coding partner.</p>
                        </div>

                        <div className="relative text-center group">
                            <div className="relative z-10 w-24 h-24 mx-auto bg-slate-900 rounded-full border border-slate-700 flex items-center justify-center mb-6 group-hover:border-teal-500/50 transition-colors shadow-xl">
                                <span className="text-3xl font-bold text-teal-500">3</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-slate-200">Start Coding</h3>
                            <p className="text-slate-400">Collaborate in real-time with instant sync.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="rounded-[2.5rem] bg-gradient-to-br from-sky-600 to-indigo-700 p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10 text-white">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to code together?</h2>
                            <p className="text-sky-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                                Join thousands of developers who are already using Commit to better their coding workflow.
                            </p>
                            <button
                                onClick={toggleModal}
                                className="px-8 py-4 bg-white text-sky-600 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl"
                            >
                                Start Coding Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;