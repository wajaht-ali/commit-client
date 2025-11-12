/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import { FaCheckCircle, FaExclamationCircle, FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdMailOutline } from "react-icons/md";

const ContactUsPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                setIsSuccess(false);
                setFormData({ name: '', email: '', message: '' });
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            if (formData.name.toLowerCase() === 'error') {
                throw new Error('Failed to send message. Please try again.');
            }
            setIsSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariant = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const textVariant = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    const formVariant = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    const formContainerVariant = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, scale: 0.98, transition: { duration: 0.4 } }
    };


    return (
        <div className="relative bg-[#0d1117] text-[#c9d1d9] min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 w-[60vw] h-[60vh] -translate-x-1/2 -translate-y-1/2 bg-blue-900/50 rounded-full filter blur-[150px] opacity-20 "></div>

            <motion.div
                className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto pt-10"
                variants={containerVariant}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={textVariant} className="text-center lg:text-left">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Let's Start a Conversation
                    </h1>
                    <p className="text-lg text-neutral-400 mb-8">
                        We're here to help and answer any question you might have. We look forward to hearing from you.
                    </p>
                    <div className="flex flex-col items-center lg:items-start space-y-4">
                        <a href="mailto:support@codecommit.site" className="flex items-center gap-3 text-neutral-300 hover:text-blue-400 transition-colors">
                            <MdMailOutline />
                            <span>contact.chwajahat@gmail.com</span>
                        </a>
                        <div className="flex items-center gap-6 pt-2">
                            <a href="https://linkedin.com/in/wajhat-ali/" target='_blank' aria-label="LinkedIn" className="text-gray-400 hover:text-blue-400" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                                <FaLinkedin size={24} />
                            </a>
                            <a href="https://github.com/wajaht-ali/" target='_blank' aria-label="GitHub" className="text-gray-400 hover:text-blue-400" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                                <FaGithub size={24} />
                            </a>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={formVariant}>
                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                key="success"
                                className="flex flex-col items-center justify-center bg-[#161b22]/80 backdrop-blur-sm border border-green-500/50 rounded-lg p-10 h-[480px]"
                                variants={formContainerVariant}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <FaCheckCircle className="text-green-400 text-5xl mb-4" />
                                <h2 className="text-2xl font-bold text-white">Message Sent!</h2>
                                <p className="mt-2 text-center text-neutral-300">Thank you for reaching out. We'll be in touch soon.</p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                onSubmit={handleSubmit}
                                className="bg-[#161b22]/80 backdrop-blur-sm border border-[#30363d]/50 rounded-lg p-6 sm:p-8 space-y-6"
                                variants={formContainerVariant}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                                    <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"></textarea>
                                </div>

                                {error && (
                                    <div className="flex items-center text-red-400 text-sm"><FaExclamationCircle className="mr-2" /><p>{error}</p></div>
                                )}

                                <div>
                                    <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                        {isSubmitting ? (
                                            <><ClipLoader color="#c9d1d9" size={20} className="mr-2" /><span>Sending...</span></>
                                        ) : ('Send Message')}
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ContactUsPage;