/* eslint-disable no-unused-vars */
// import React from 'react'
// import { Link } from 'react-router-dom'
// import Editor from '@monaco-editor/react'
// import { useState } from 'react'

// function Commit() {
//   const [code, setCode] = useState(`console.log("Hello, world!");`);
//   const [output, setOutput] = useState('');

//   const handleEditorChange = (value) => {
//     setCode(value);
//   };

//   const runCode = () => {
//     try {
//       // Capture console.log output
//       let consoleOutput = '';
//       const originalConsoleLog = console.log;
//       console.log = (...args) => {
//         consoleOutput += args.join(' ') + '\n';
//       };

//       // Run the code
//       // eslint-disable-next-line no-new-func
//       new Function(code)();

//       // Restore console.log
//       console.log = originalConsoleLog;

//       setOutput(consoleOutput || 'No output');
//     } catch (err) {
//       setOutput(err.message);
//     }
//   };
//   return (
//     <>
//       {/* here will be commit page for pair programming */}
//       <header className='shadow sticky z-50 top-0 bg-white'>
//         <nav className='flex justify-between items-center p-4 max-w-7xl mx-auto'>
//           <div >
//             <h1>Commit </h1>
//           </div>
//           <div className='flex gap-4'>
//             <button className='bg-gray-500 text-white px-4 py-2 rounded'><a href=''>Save</a></button>
//             <button className='bg-gray-500 text-white px-4 py-2 rounded'><a href=''>Settings</a></button>
//             <button className='bg-blue-500 text-white px-4 py-2 rounded'><a href='/signup'>SignUp</a></button>
//             <button className='bg-gray-500 text-white px-4 py-2 rounded'><a href='/login'>Login</a></button>

//           </div>
//         </nav>
//       </header>

//       <main className='w-full h-min p-4  mb-6'>
//         {/* user details and room details aside bar */}
//         <div className='flex justify-between items-center mb-4 p-2 bg-gray-200 rounded-lg'>
//           <div>
//             <h2 className='text-lg font-semibold'>Room ID: 12345</h2>
//             <p className='text-sm text-gray-600'>Share this ID to invite others</p>
//           </div>
//           <div>
//             <ul className='list-none flex gap-4 '>
//               {/* user icon */}
//               <li>
//                 <img src="https://www.svgrepo.com/show/7025/user.svg" alt="User Icon" className="inline w-6 h-6 mr-2" />
//               </li>
//               <li>
//                 <img src="https://www.svgrepo.com/show/7025/user.svg" alt="User Icon" className="inline w-6 h-6 mr-2" />
//               </li>

//             </ul>
//           </div>
//         </div>

//         {/* styling for the editor container and buttons÷ */}

//         <div className='flex flex-row items-center justify-center gap-4'>
//           <div className='h-[350px] w-[700px] border-2 border-gray-300 rounded-lg overflow-hidden'>
//             {/* <Editor /> */}
//             <Editor
//               height="100%"
//               defaultLanguage="javascript"
//               value={code}
//               onChange={handleEditorChange}
//               options={{ fontSize: 16 }}
//             />
//           </div>
//           <button
//             className='bg-green-500 text-white text-center h-10 px-4 py-2 rounded mt-2'
//             onClick={runCode}
//           >
//             Run
//           </button>
//           <div className='h-[350px] w-[700px] border-2 border-gray-300 rounded-lg overflow-hidden'>
//             {/* <Editor /> */}
//             <div
//               className='h-full'
//               style={{
//                 flex: 1,
//                 padding: '14px',
//                 margin: '0px',
//                 backgroundColor: '#1e1e1e',
//                 color: '#d4d4d4',
//                 fontFamily: 'monospace',
//                 whiteSpace: 'pre-wrap',
//                 overflowY: 'auto',
//               }}
//             >
//               {output}
//             </div>
//           </div>
//         </div>
//         {/* chat box */}
//         <div className='mt-4 bg-gray-200 p-4 rounded-lg'>
//           <h2 className='text-lg font-semibold mb-2'>Chat Box</h2>
//           <div className='h-20 overflow-y-auto mb-2 p-2 border border-gray-300 rounded-lg bg-white'>
//             {/* Chat messages will go here */}
//             <p>User1: Hello!</p>
//             <p>User2: Hi there!</p>
//             <p>User1: How are you?</p>

//           </div>
//         </div>
//         <div className='mt-4 bg-amber-400 items-center  rounded-lg text-center'>
//           <Link to='/'>
//             <button className='bg-gray-500 text-white m-2 rounded'>Go Back Home</button>
//           </Link>
//         </div>


//       </main>
//     </>
//   )
// }

// export default Commit

import React, { useEffect, useState, useRef } from 'react'; // 1. Import useRef
import { useParams, Link, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { useSocket } from '../../../context/SocketContext.jsx';
import toast from 'react-hot-toast';

// avatar component
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


function EditorPage() {
  const { roomId } = useParams();
  const socket = useSocket();
  const navigate = useNavigate();

  const codeRef = useRef(null);
  const hasJoined = useRef(false);

  const [connectedUsers, setConnectedUsers] = useState([]);
  const [code, setCode] = useState(`// Welcome! Code will sync in real-time.`);
  const [output, setOutput] = useState('');

  // sockets event handling
  useEffect(() => {
    if (!socket) return;

    if (!hasJoined.current) {
      socket.emit('join-room', { roomId, username: `User_${Math.floor(Math.random() * 1000)}` });
      hasJoined.current = true;
    }

    // handles the "update-user-list" event
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

    // This function now correctly cleans up all listeners.
    return () => {
      socket.off('update-user-list');
      socket.off('code-update', handleCodeUpdate);
      socket.off('get-code-state');

      socket.off('user-left', handleUserLeft);
      socket.off('user-joined', handleUserJoined);
    };

  }, [socket, roomId]);

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
    window.location.replace('/');
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
      setOutput(`Error: ${err.message}`);
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
          <p className='font-mono'>main.js</p>
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