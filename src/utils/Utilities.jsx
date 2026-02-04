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

export const getAuthErrorMessage = (errorCode) => {
  const errorMessages = {
    "auth/email-already-in-use": "This email is already registered. Please log in instead.",
    "auth/weak-password": "Password is too weak. Use at least 8 characters.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/popup-closed-by-user": "Sign-up was cancelled. Please try again.",
    "auth/cancelled-popup-request": "Sign-up was cancelled.",
    "auth/network-request-failed": "Network error. Please check your connection.",
  };
  return errorMessages[errorCode] || "An error occurred. Please try again.";
};

export const getAuthLoginErrorMessage = (errorCode) => {
  const errorMessages = {
    "auth/invalid-credential": "Invalid email or password. Please try again.",
    "auth/user-not-found": "No account found with this email. Please sign up.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/too-many-requests": "Too many failed attempts. Please try again later.",
    "auth/user-disabled": "This account has been disabled. Contact support.",
    "auth/popup-closed-by-user": "Sign-in was cancelled. Please try again.",
    "auth/cancelled-popup-request": "Sign-in was cancelled.",
    "auth/network-request-failed": "Network error. Please check your connection.",
  };
  return errorMessages[errorCode] || "An error occurred. Please try again.";
};