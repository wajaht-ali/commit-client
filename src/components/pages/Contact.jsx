/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
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

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Side: Info */}
                <div className="fade-in-up text-center lg:text-left">
                    <span className="inline-block py-1 px-3 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-semibold mb-6">
                        Contact Support
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-50 mb-6 leading-tight">
                        Let's Start a <br /> Conversation
                    </h1>
                    <p className="text-lg text-slate-400 mb-10 max-w-lg mx-auto lg:mx-0">
                        We're here to help and answer any question you might have. We look forward to hearing from you.
                    </p>

                    <div className="flex flex-col items-center lg:items-start space-y-6">
                        <a href="mailto:contact.chwajahat@gmail.com" className="flex items-center gap-4 text-slate-300 hover:text-sky-400 transition-colors group p-4 rounded-xl bg-slate-900/50 border border-white/5 hover:border-sky-500/50 w-full max-w-md">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                                <MdMailOutline size={20} />
                            </div>
                            <span className="font-medium">contact.chwajahat@gmail.com</span>
                        </a>

                        <div className="flex items-center gap-4 pt-4">
                            <a href="https://linkedin.com/in/wajhat-ali/" target='_blank' rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-500 transition-all duration-300 hover:-translate-y-1">
                                <FaLinkedin size={24} />
                            </a>
                            <a href="https://github.com/wajaht-ali/" target='_blank' rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-500 transition-all duration-300 hover:-translate-y-1">
                                <FaGithub size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="fade-in-up delay-100">
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">

                        {isSuccess ? (
                            <div className="flex flex-col items-center justify-center h-[420px] text-center animate-fade-in">
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                    <FaCheckCircle className="text-green-500 text-4xl" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
                                <p className="text-slate-400">Thank you for reaching out. We'll be in touch soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-slate-300 ml-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl p-4 text-slate-100 focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition-all placeholder:text-slate-600"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-300 ml-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl p-4 text-slate-100 focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition-all placeholder:text-slate-600"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-slate-300 ml-1">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl p-4 text-slate-100 focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition-all placeholder:text-slate-600 resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                {error && (
                                    <div className="flex items-center text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                                        <FaExclamationCircle className="mr-2 flex-shrink-0" />
                                        <p>{error}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex justify-center items-center bg-sky-500 text-white font-bold py-4 px-8 rounded-xl transition hover:bg-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-sky-500/25 transform hover:-translate-y-0.5"
                                >
                                    {isSubmitting ? (
                                        <><ClipLoader color="#ffffff" size={20} className="mr-2" /><span>Sending...</span></>
                                    ) : ('Send Message')}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContactUsPage;