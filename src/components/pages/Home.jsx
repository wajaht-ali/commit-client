import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import toast, { Toaster } from 'react-hot-toast'; 

const HomePage = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("");
 
    const createNewRoom = (e) => {
        e.preventDefault();
        const id = nanoid(6).toUpperCase();
        toast.success('Created a new room!');
        navigate(`/editor/${id}`);
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
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white font-sans">
            <Toaster position="top-center" />

            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-indigo-400">
                    Commit
                </h1>
                <p className="text-center text-gray-400 mb-8">
                    Real-time Collaborative Coding
                </p>

                {/* Create Room Button */}
                <button
                    onClick={createNewRoom}
                    className="w-full px-6 py-3 mb-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition duration-300 font-medium text-lg"
                >
                    Create New Room
                </button>

                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-600" />
                    <span className="px-4 text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-600" />
                </div>

                {/* Join Room Form */}
                <form onSubmit={handleJoinRoom}>
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Enter Room ID"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value.toUpperCase())} 
                            className="px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition duration-300 font-medium text-lg"
                        >
                            Join Room
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HomePage;