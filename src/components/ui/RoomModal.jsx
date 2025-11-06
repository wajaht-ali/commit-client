/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { customAlphabet } from 'nanoid';
import toast from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';

const ALPHABETS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(ALPHABETS, 6);


const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 260,
            damping: 20,
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        transition: { duration: 0.2, ease: 'easeOut' },
    },
};

const contentVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const RoomModal = ({ isVisible, toggleModal }) => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = nanoid().toUpperCase();
        toast.success('Created a new room!');
        navigate(`/editor/${id}`, {
            state: { isCreating: true },
        });
    };

    const handleJoinRoom = (e) => {
        e.preventDefault();
        if (roomId.trim() === "") {
            toast.error("Please enter a Room ID.");
            return;
        }
        navigate(`/editor/${roomId}`);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={toggleModal}
                >
                    <motion.div
                        className="bg-slate-800 p-8 rounded-xl shadow-2xl shadow-sky-500/10 w-full max-w-md relative border border-slate-700"
                        variants={modalVariants}
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.button
                            onClick={toggleModal}
                            className="absolute top-3 right-3 text-slate-500 hover:text-slate-100 transition-colors h-8 w-8 rounded-full flex items-center justify-center bg-slate-700/50 hover:bg-slate-700 hover:cursor-pointer"
                            aria-label="Close modal"
                            variants={contentVariants}
                        >
                            <FaTimes />
                        </motion.button>

                        <motion.h2
                            className="text-2xl font-bold mb-6 text-center text-sky-400"
                            variants={contentVariants}
                        >
                            Start Collaborating
                        </motion.h2>

                        <motion.button
                            onClick={createNewRoom}
                            className="w-full px-6 py-3 mb-4 font-bold text-white bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-sky-500/20 text-lg hover:cursor-pointer"
                            variants={contentVariants}
                        >
                            Create New Room
                        </motion.button>

                        <motion.div className="flex items-center my-6" variants={contentVariants}>
                            <hr className="flex-grow border-slate-700" />
                            <span className="px-4 text-slate-500 text-sm">OR</span>
                            <hr className="flex-grow border-slate-700" />
                        </motion.div>

                        <motion.form onSubmit={handleJoinRoom} variants={contentVariants}>
                            <div className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder="Enter Room ID"
                                    value={roomId}
                                    required
                                    onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                                    className="px-4 py-3 text-slate-200 rounded-lg border border-slate-700 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition placeholder-slate-500"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 font-bold text-white bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-sky-500/20 text-lg hover:cursor-pointer"
                                >
                                    Join Room
                                </button>
                            </div>
                        </motion.form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RoomModal;