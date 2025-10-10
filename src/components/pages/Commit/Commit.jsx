/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { useSocket } from '../../../context/SocketContext.jsx';
import toast from 'react-hot-toast';
import { FaCopy } from 'react-icons/fa';

const UserAvatar = ({ username }) => {
  const initial = username ? username[0].toUpperCase() : '?';
  return (
    <div
      className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg"
      title={username}
    >
      {initial}
    </div>
  );
};

const EditorPage = () => {
  const { roomId } = useParams();
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const codeRef = useRef(null);
  const hasJoined = useRef(false);

  const [connectedUsers, setConnectedUsers] = useState([]);
  const [code, setCode] = useState(`// Welcome! Code will sync in real-time.`);
  const [output, setOutput] = useState('');

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
      setCode(newCode);
    };
    socket.on('code-update', handleCodeUpdate);

    socket.on('get-code-state', () => {
      if (codeRef.current) {
        socket.emit('send-code-state', { roomId, code: codeRef.current });
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

    return () => {
      socket.off('update-user-list');
      socket.off('code-update', handleCodeUpdate);
      socket.off('get-code-state');
      socket.off('user-left', handleUserLeft);
      socket.off('user-joined', handleUserJoined);
      socket.off('room-not-found', handleRoomNotFound);
    };

  }, [socket, roomId, location.state, navigate]);

  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  const handleEditorChange = (value) => {
    setCode(value);
    if (socket) {
      socket.emit('code-change', { roomId, code: value });
    }
  };

  const leaveRoom = () => {
    if (socket) {
      socket.emit('leave-room');
    }
    navigate('/');
  };

  const runCode = () => {
    try {
      let consoleOutput = '';
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        consoleOutput += args.join(' ') + '\n';
      };
      new Function(code)();
      console.log = originalConsoleLog;
      setOutput(consoleOutput || 'Execution finished with no output.');
    } catch (err) {
      if (err instanceof Error) {
        setOutput(`Error: ${err.message}`);
      } else {
        setOutput('An unknown error occurred during execution.');
      }
    }
  };

  const copyRoomId = async () => {
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

  if (!socket) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 text-white">
        Connecting to the collaboration server...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      <aside className="w-64 bg-gray-800 p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">Commit</h1>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Connected Users ({connectedUsers.length})</h2>
          <div className="flex flex-col gap-3">
            {connectedUsers.map((user) => (
              <div key={user.socketId} className="flex items-center gap-2">
                <UserAvatar username={user.username} />
                <span>{user.username}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <button onClick={leaveRoom} className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors">
            Leave Room
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col p-4 gap-4">
        <div className="flex-shrink-0 bg-gray-800 rounded-lg p-2 flex items-center">
          <div className="flex items-center space-x-3 bg-gray-900 rounded-lg px-3 py-1">
            <span className="text-gray-400 text-sm">Room ID:</span>
            <span className="font-mono text-green-400">{roomId}</span>
            <button
              onClick={copyRoomId}
              title="Copy Room ID"
              className="text-gray-400 hover:text-white transition-colors hover:cursor-pointer"
            >
              <FaCopy />
            </button>
          </div>
          <button
            onClick={runCode}
            className="ml-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors"
          >
            Run
          </button>
        </div>
        <div className="flex-1 grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg overflow-hidden h-full">
            <Editor
              height="100%"
              theme="vs-dark"
              language="javascript"
              value={code}
              onChange={handleEditorChange}
              options={{ fontSize: 14, minimap: { enabled: false } }}
            />
          </div>
          <div className="bg-gray-800 rounded-lg flex flex-col h-full">
            <div className="p-3 bg-gray-700 rounded-t-lg">
              <h3 className="font-semibold">Output</h3>
            </div>
            <pre className="flex-1 p-4 bg-black text-white text-sm whitespace-pre-wrap overflow-y-auto font-mono">
              {output}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EditorPage;