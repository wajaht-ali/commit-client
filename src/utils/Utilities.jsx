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

export const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'cpp', label: 'C++' },
];

export const monacoLanguageMap = {
    javascript: "javascript",
    python: "python",
    cpp: "cpp",
};

export const defaultCodeTemplates = {
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hi from C++" << endl;
    return 0;
}`,

    python: `print("Hi from Python!")`,

    javascript: `console.log("Hi from JavaScript!");`,
};

export const RTC_CONFIG = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" }, // free STUN server

    ],
};


export const createUUID = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const CLIENT_ID_KEY = 'commit:clientId';
const USERNAME_KEY = 'commit:username';

export const getOrCreateClientId = () => {
    let id = localStorage.getItem(CLIENT_ID_KEY);
    if (!id) {
        id = createUUID();
        localStorage.setItem(CLIENT_ID_KEY, id);
    }
    return id;
};

export const getOrCreateUsername = () => {
    let name = localStorage.getItem(USERNAME_KEY);
    if (!name) {
        name = `User_${createUUID().slice(0, 6)}`;
        localStorage.setItem(USERNAME_KEY, name);
    }
    return name;
};