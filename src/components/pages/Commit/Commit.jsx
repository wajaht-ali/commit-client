/* eslint-disable no-unused-vars */

import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaCopy } from 'react-icons/fa';
import Editor from '@monaco-editor/react';
import toast from 'react-hot-toast';
import { useSocket } from '../../../context/SocketContext.jsx';
import { defaultCodeTemplates, monacoLanguageMap, UserAvatar } from '../../../utils/Utilities.jsx';
import { copyRoomId } from '../../../utils/Utilities.jsx';
import { languageOptions } from '../../../utils/Utilities.jsx';
import axios from 'axios';

const EditorPage = () => {
  const { roomId } = useParams();
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const codeRef = useRef(null);
  const hasJoined = useRef(false);

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'javascript';
  });
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [code, setCode] = useState(``);
  const [output, setOutput] = useState('');
  const BASE_URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setCode(defaultCodeTemplates[language]);
  }, []);

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
    socket.on('language-update', (newLanguage) => {
      setLanguage(newLanguage);
      toast.success(`Language switched to ${languageOptions.find(l => l.value === newLanguage)?.label || 'a new language'}`);
    });

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
      socket.off('language-update');
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
    localStorage.removeItem('selectedLanguage');
    if (socket) {
      socket.emit('leave-room');
    }
    navigate('/');
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    localStorage.setItem('selectedLanguage', newLanguage);

    const template = defaultCodeTemplates[newLanguage] || "// Start coding here...";
    setCode(template);
    codeRef.current = template;

    socket.emit('language-change', { roomId, language: newLanguage });
    socket.emit('code-change', { roomId, code: template });
    toast.success(`Language switched to ${languageOptions.find(l => l.value === newLanguage)?.label || 'a new language'}`);
  };

  const runCode = async () => {
    setOutput('Executing...');

    if (language === 'javascript') {
      try {
        let consoleOutput = '';
        const originalConsoleLog = console.log;
        console.log = (...args) => {
          consoleOutput += args.map(String).join(' ') + '\n';
        };
        new Function(code)();
        console.log = originalConsoleLog;
        setOutput(consoleOutput || 'Execution finished with no output.');
      } catch (err) {
        setOutput(err instanceof Error ? `Error: ${err.message}` : 'An unknown error occurred.');
      }
      return;
    }

    if (language === 'python' || language === 'cpp') {
      try {
        const response = await axios.post(`${BASE_URI}/api/v1/code/execute`, {
          language,
          code,
        });
        console.log("response: ", response);
        setOutput(response.data.output || 'Execution finished with no output.');

      } catch (error) {
        console.log("Errorrr: ", error);
        if (error.response && error.response.data && error.response.data.output) {
          setOutput(`Error: ${error.response.data.output}`);
        } else {
          setOutput('Failed to connect to the execution service. Please check the server.');
        }
      }
      return;
    }

    setOutput(`Execution for language "${language}" is not supported.`);
  };


  if (!socket) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 text-white">
        Connecting to the collaboration server...
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-900 text-white font-sans">

      <aside className="w-full lg:w-64 bg-gray-800 p-4 flex flex-col shrink-0">
        <h1 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">Commit</h1>
        <div className="flex-1 flex flex-col overflow-hidden">
          <h2 className="text-md lg:text-lg font-semibold mb-2">Connected Users ({connectedUsers.length})</h2>

          <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden pb-2 lg:pb-0">
            {connectedUsers.map((user) => (
              <div key={user.socketId} className="flex flex-col lg:flex-row items-center gap-2">
                <UserAvatar username={user.username} />
                <span className="text-[12px] lg:text-lg lg:inline">{user.username}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <button onClick={leaveRoom} className="w-auto lg:w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors mt-4 lg:mt-0 hover:cursor-pointer">
            Leave Room
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
        <div className="flex items-center justify-between bg-gray-800 rounded-md px-3 py-2 space-x-2 sm:flex-nowrap">

          <div className="flex items-center space-x-2 bg-gray-900 rounded-md px-2 py-1">
            <span className="text-gray-400 text-xs sm:text-sm">Room:</span>
            <span className="font-mono text-green-400 text-xs sm:text-sm peer" onClick={() => copyRoomId(roomId)}>{roomId}</span>
            <button
              onClick={() => copyRoomId(roomId)}
              title="Copy Room ID"
              className="text-gray-400 hover:text-white transition-colors cursor-pointer peer-hover:text-white peer-hover:cursor-default"
            >
              <FaCopy size={12} />
            </button>
          </div>

          <div className="relative flex-shrink-0">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-[#1e1e1e] text-gray-200 font-mono text-xs sm:text-sm border border-gray-700 rounded-md 
                 px-3 py-1 pr-8 appearance-none cursor-pointer transition-all 
                 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500
                 hover:border-gray-500 hover:bg-[#252526]"
            >
              {languageOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">
              ▼
            </span>
          </div>

          <button
            onClick={runCode}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold text-xs sm:text-sm py-1 px-3 rounded transition-colors hover:cursor-pointer"
          >
            Run
          </button>
        </div>


        <div className="flex-1 grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-4 min-h-0">
          <div className="bg-gray-800 rounded-lg overflow-hidden h-full">
            <Editor
              height="100%"
              theme="vs-dark"
              language={monacoLanguageMap[language] || "javascript"}
              value={code}
              onChange={handleEditorChange}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }} />

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