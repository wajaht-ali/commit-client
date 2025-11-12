/* eslint-disable no-unused-vars */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import wajahat from "../../assets/Wajahat_Ali_Profile.jpg";
import hammad from '../../assets/hammad_dev.jpeg';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdMailOutline } from "react-icons/md";

const AboutUs = () => {

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="bg-[#0d1117] text-[#c9d1d9] min-h-screen p-4 sm:p-6 lg:p-8 overflow-hidden">
            <div className="max-w-4xl mx-auto">

                <motion.section
                    className="text-center my-12 pt-8 md:my-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={fadeIn}
                >
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        Simplifying How Developers Create Together.
                    </h1>
                    <p className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                        Code Commit was born from the idea that seamless collaboration is the cornerstone of great software. Our platform provides a real-time, intuitive, and powerful coding environment designed to bring developers together. Whether you're pair programming, teaching, or brainstorming, we provide the tools to make your collaborative coding sessions more productive and enjoyable. We handle the environment so you can focus on what truly matters: writing clean, efficient code together.
                    </p>
                </motion.section>

                <motion.section
                    className="my-12 md:my-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeIn}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 border-b border-[#30363d] pb-4">
                        Meet the Developers
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        <motion.div
                            className="text-center p-6"
                            variants={fadeIn}
                        >
                            <motion.div
                                className="relative inline-block mb-4"
                                whileHover={{ y: -10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <img
                                    src={wajahat}
                                    alt="Client-Side Developer"
                                    className="w-28 h-28 rounded-full border-4 border-blue-500"
                                />
                            </motion.div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Wajahat Ali</h3>
                            <p className="text-blue-400 mb-3">Software Engineer @ mimAR Studios</p>
                            <p className="text-sm sm:text-base max-w-xs mx-auto">
                                Manages the backbone of Code Commit's real-time functionality, ensuring a secure, scalable, and lightning-fast environment.
                            </p>
                            <div className="flex justify-center items-center space-x-5 mt-4">
                                <motion.a href="https://linkedin.com/in/wajhat-ali/" target='_blank' aria-label="LinkedIn" className="text-gray-400 hover:text-blue-400" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                                    <FaLinkedin size={24} />
                                </motion.a>
                                <motion.a href="https://github.com/wajaht-ali/" target='_blank' aria-label="GitHub" className="text-gray-400 hover:text-blue-400" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                                    <FaGithub size={24} />
                                </motion.a>
                                <motion.a href="mailto:contact.chwajahat@gmail.com" target='_blank' aria-label="Email" className="text-gray-400 hover:text-blue-400" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                                    <MdMailOutline size={24} />
                                </motion.a>
                            </div>
                        </motion.div>

                        <motion.div
                            className="text-center p-6"
                            variants={fadeIn}
                        >
                            <motion.div
                                className="relative inline-block mb-4"
                                whileHover={{ y: -10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <img
                                    src={hammad}
                                    alt="Server-Side Developer"
                                    className="w-28 h-28 rounded-full border-4 border-blue-500"
                                />
                            </motion.div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Hammad Ali</h3>
                            <p className="text-blue-400 mb-3">Frontend Engineer</p>
                            <p className="text-sm sm:text-base max-w-xs mx-auto">
                                The architect of the user experience you see and interact with, crafting a front-end that is both powerful and easy to use.
                            </p>
                            <div className="flex justify-center items-center space-x-5 mt-4">
                                <motion.a href="https://linkedin.com/in/hammad-swe/" target='_blank' aria-label="LinkedIn" className="text-gray-400 hover:text-blue-400" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                                    <FaLinkedin size={24} />
                                </motion.a>
                                <motion.a href="https://github.com/hammad-swe/" target='_blank' aria-label="GitHub" className="text-gray-400 hover:text-blue-400" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                                    <FaGithub size={24} />
                                </motion.a>
                                <motion.a href="mailto:hammadali78056@gmail.com" target='_blank' aria-label="Email" className="text-gray-400 hover:text-blue-400" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                                    <MdMailOutline size={24} />
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                <motion.section
                    className="text-center my-12 md:my-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={fadeIn}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Collaborating?</h2>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/editor"
                            className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Go to Editor
                        </Link>
                    </motion.div>
                </motion.section>

            </div>
        </div>
    );
};

export default AboutUs;