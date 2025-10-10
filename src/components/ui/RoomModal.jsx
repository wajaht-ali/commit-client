import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customAlphabet } from 'nanoid';
import toast from 'react-hot-toast';

const ALPHABETS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(ALPHABETS, 6);

const RoomModal = ({ toggleModal }) => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = nanoid().toUpperCase();
        console.log("ID : ", id);
        toast.success('Created a new room!');
        navigate(`/editor/${id}`, {
            state: {
                isCreating: true,
            },
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
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md relative">
                <button
                    onClick={toggleModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white text-3xl hover:cursor-pointer"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-green-400">
                    Start Collaborating
                </h2>

                <button
                    onClick={createNewRoom}
                    className="w-full px-6 py-3 mb-4 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition duration-300 font-medium text-lg hover:cursor-pointer"
                >
                    Create New Room
                </button>

                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-600" />
                    <span className="px-4 text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-600" />
                </div>

                <form onSubmit={handleJoinRoom}>
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Enter Room ID"
                            value={roomId}
                            required
                            onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                            className="px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition duration-300 font-medium text-lg hover:cursor-pointer"
                        >
                            Join Room
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoomModal;