/* eslint-disable no-unused-vars */
import { useOutletContext } from 'react-router-dom';
import { FaCode, FaUsers, FaLaptopCode } from 'react-icons/fa';
import { useAuth } from "../../context/AuthContext";
import { motion } from 'framer-motion';

const HomePage = () => {
    const { user } = useAuth();
    const { toggleModal } = useOutletContext();

    const fadeInUp = {
        initial: { opacity: 0, y: 40 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeInOut',
            },
        },
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <>
            <motion.header
                className="container mx-auto px-6 py-20 md:py-32"
                initial="initial"
                animate="animate"
                variants={staggerContainer}
            >
                <div className="md:flex md:items-center">
                    <div className="md:w-1/2">
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold leading-tight text-slate-50 pt-8 md:pt-0"
                            variants={fadeInUp}
                        >
                            Code your commitments, <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500">Live.</span>
                        </motion.h1>
                        <motion.p
                            className="mt-4 text-lg md:text-xl text-slate-200"
                            variants={fadeInUp}
                        >
                            A shared coding space built for dedicated partnership and deep focus.
                        </motion.p>
                        <motion.p
                            className="mt-6 text-slate-400"
                            variants={fadeInUp}
                        >
                            Code Commit provides the seamless, real-time environment you need to fully dedicate your attention to the task. Write cleaner, more robust code through instant feedback and shared ownership.                        </motion.p>
                        <motion.div variants={fadeInUp}>
                            {user?.userData ? (
                                <button
                                    onClick={toggleModal}
                                    className="mt-8 px-8 py-3 font-bold text-white bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-sky-500/20 hover:cursor-pointer"
                                >
                                    Create or Join Room
                                </button>
                            ) : (
                                <button
                                    onClick={() => window.location.href = '/auth/login'}
                                    className="mt-8 px-8 py-3 font-bold text-white bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-sky-500/20 hover:cursor-pointer"
                                >
                                    Get Started
                                </button>
                            )}
                        </motion.div>
                    </div>
                    <motion.div
                        className="hidden md:flex md:w-1/2 mt-12 md:mt-0 justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.5, ease: 'easeOut' } }}
                    >
                        <FaLaptopCode className="text-9xl md:text-[12rem] text-sky-500 opacity-20" />
                    </motion.div>
                </div>
            </motion.header>

            <motion.section
                id="features"
                className="bg-slate-800/40 py-20"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
            >
                <div className="container mx-auto px-6">
                    <motion.h2
                        className="text-3xl font-bold text-center mb-12 text-slate-50"
                        variants={fadeInUp}
                    >
                        Why Choose Commit?
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={staggerContainer}
                    >
                        <motion.div
                            className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-sky-500/50 transition-colors duration-300"
                            variants={fadeInUp}
                        >
                            <FaCode className="text-5xl text-sky-400 mb-4 mx-auto" />
                            <h3 className="text-2xl font-bold mb-2 text-center text-slate-50">Real-time Collaboration</h3>
                            <p className="text-slate-400 text-center">
                                Work with peers in a shared environment. See changes live and learn from each other's approaches.
                            </p>
                        </motion.div>
                        <motion.div
                            className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-sky-500/50 transition-colors duration-300"
                            variants={fadeInUp}
                        >
                            <FaUsers className="text-5xl text-sky-400 mb-4 mx-auto" />
                            <h3 className="text-2xl font-bold mb-2 text-center text-slate-50">Enhanced Learning</h3>
                            <p className="text-slate-400 text-center">
                                Accelerate your learning by observing how others solve problems. Get instant feedback and share knowledge.
                            </p>
                        </motion.div>
                        <motion.div
                            className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-sky-500/50 transition-colors duration-300"
                            variants={fadeInUp}
                        >
                            <FaLaptopCode className="text-5xl text-sky-400 mb-4 mx-auto" />
                            <h3 className="text-2xl font-bold mb-2 text-center text-slate-50">Efficient Problem Solving</h3>
                            <p className="text-slate-400 text-center">
                                Two heads are better than one. Tackle complex problems more effectively and produce higher quality code.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                className="container mx-auto px-6 py-20"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
            >
                <motion.h2
                    className="text-3xl font-bold text-center mb-16 text-slate-50"
                    variants={fadeInUp}
                >
                    How It Works
                </motion.h2>
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12"
                    variants={staggerContainer}
                >
                    <motion.div className="text-center" variants={fadeInUp}>
                        <div className="relative mb-4">
                            <div className="bg-slate-800 border-2 border-sky-500/30 rounded-full h-24 w-24 flex items-center justify-center mx-auto">
                                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-500 to-cyan-500">1</span>
                            </div>
                        </div>
                        <p className="text-slate-200">Create a new code room.</p>
                    </motion.div>
                    <motion.div className="text-center" variants={fadeInUp}>
                        <div className="bg-slate-800 border-2 border-sky-500/30 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-500 to-cyan-500">2</span>
                        </div>
                        <p className="text-slate-200">Share the unique room ID with your peer.</p>
                    </motion.div>
                    <motion.div className="text-center" variants={fadeInUp}>
                        <div className="bg-slate-800 border-2 border-sky-500/30 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-500 to-cyan-500">3</span>
                        </div>
                        <p className="text-slate-200">Start coding and collaborating in real-time!</p>
                    </motion.div>
                </motion.div>
            </motion.section>
        </>
    );
};

export default HomePage;