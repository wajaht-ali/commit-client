/* eslint-disable react-refresh/only-export-components */
import toast from "react-hot-toast";

export const UserAvatar = ({ username }) => {
    const initial = username ? username[0].toUpperCase() : '?';
    return (
        <div
            className="w-6 h-6 lg:w-10 lg:h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold lg:font-bold text-md lg:text-lg shrink-0"
            title={username}
        >
            {initial}
        </div>
    );
};

export const copyRoomId = async (roomId) => {
    try {
        if (roomId) {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID copied to clipboard!');
        }
    } catch (err) {
        toast.error('Failed to copy Room ID.');
        console.error('Clipboard copy failed:', err);
    }
};