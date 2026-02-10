import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { languageOptions } from '../utils/Utilities';

export const useRoomSocket = ({
    socket,
    roomId,
    language,
    location,
    navigate,
    setConnectedUsers,
    setLanguageCodeMap,
    setLanguage,
    getCurrentCode,
}) => {
    const hasJoined = useRef(false);

    useEffect(() => {
        if (!socket) return;

        if (!hasJoined.current) {
            socket.emit('join-room', {
                roomId,
                username: `User_${Math.floor(Math.random() * 1000)}`,
                isCreating: location.state?.isCreating,
            });
            hasJoined.current = true;
        }

        socket.on('update-user-list', (users) => {
            setConnectedUsers(users);
        });

        const handleCodeUpdate = (newCode) => {
            setLanguageCodeMap(prev => ({
                ...prev,
                [language]: newCode,
            }));
        };
        socket.on('code-update', handleCodeUpdate);

        socket.on('language-update', (newLanguage) => {
            setLanguage(newLanguage);
            toast.success(
                `Language switched to ${languageOptions.find(l => l.value === newLanguage)?.label ||
                'a new language'
                }`
            );
        });

        socket.on('get-code-state', () => {
            if (getCurrentCode) {
                socket.emit('send-code-state', {
                    roomId,
                    code: getCurrentCode(),
                });
            }
        });

        const handleUserLeft = ({ username }) => {
            if (username) {
                toast.error(`${username} has left the room.`);
            }
        };
        socket.on('user-left', handleUserLeft);

        const handleUserJoined = ({ username }) => {
            if (username) {
                toast.success(`${username} has joined the room.`);
            }
        };
        socket.on('user-joined', handleUserJoined);

        const handleRoomNotFound = ({ message }) => {
            toast.error(message);
            navigate('/');
        };
        socket.on('room-not-found', handleRoomNotFound);

        const handleRoomFull = ({ message }) => {
            toast.error(message || 'Room is full. Please try creating a new one.');
            setTimeout(() => {
                window.location.replace('/');
            }, 2000);
        };
        socket.on('room-full', handleRoomFull);

        return () => {
            socket.off('update-user-list');
            socket.off('code-update', handleCodeUpdate);
            socket.off('get-code-state');
            socket.off('user-left', handleUserLeft);
            socket.off('user-joined', handleUserJoined);
            socket.off('language-update');
            socket.off('room-not-found', handleRoomNotFound);
            socket.off('room-full', handleRoomFull);
        };
    }, [socket, roomId, language, location, navigate, setConnectedUsers, setLanguageCodeMap, setLanguage, getCurrentCode]);
};
