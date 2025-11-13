/* eslint-disable no-unused-vars */

import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaBars, FaCopy } from 'react-icons/fa';
import { useSocket } from '../../../context/SocketContext.jsx';
import { defaultCodeTemplates } from '../../../utils/Utilities.jsx';
import { languageOptions } from '../../../utils/Utilities.jsx';
import { useMediaQuery } from '../../../context/QueriesContext.jsx';
import { useVoiceCall } from '../../../voice/useVoiceCall.js';
import { motion, AnimatePresence } from 'framer-motion';
import AiAssistantModal from '../../ui/AiAssistantModal.jsx';

import Sidebar from './Sidebar.jsx';
import TopBar from './Topbar.jsx';
import OutputPanel from './OutputPanel.jsx';
import EditorPanel from './EditorPanel.jsx';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import toast from 'react-hot-toast';
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
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarPanelRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 1023px)');

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleSidebar = () => {
    const panel = sidebarPanelRef.current;
    if (panel) {
      if (isSidebarCollapsed) {
        panel.expand();
      } else {
        panel.collapse();
      }
    }
  };

  const isRoomCreator = connectedUsers[0]?.socketId === socket?.id;
  const BASE_URI = import.meta.env.VITE_API_URL;

  const {
    callActive,
    joined,
    muted,
    remoteStreams,
    startCall,
    joinCall,
    leaveCall,
    toggleMute,
    errors: voiceError,
  } = useVoiceCall({ socket, roomId, isRoomCreator });

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

    const handleRoomFull = ({ message }) => {
      toast.error(message || "Room is full. Please try creating a new one.");
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
      socket.disconnect();
    }
    window.location.replace('/');
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

  const handleGenerateCode = async () => {
    setIsGenerating(true);
    setGeneratedCode('');
    try {
      const response = await axios.post(`${BASE_URI}/api/v1/ai/code-generation`, {
        prompt: aiPrompt,
        language,
      });
      setGeneratedCode(response.data.generatedCode);
    } catch (error) {
      toast.error('Failed to generate code. Please try again.');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const insertGeneratedCode = () => {
    const newCode = code + '\n\n' + generatedCode;
    setCode(newCode);

    if (socket) {
      socket.emit('code-change', { roomId, code: newCode });
    }

    setIsAiModalOpen(false);
    setAiPrompt('');
    setGeneratedCode('');
  };

  if (!socket) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0d1117] text-white">
        Connecting...
      </div>
    );
  }

  const sidebarProps = {
    roomId,
    connectedUsers,
    leaveRoom,
    voiceProps: {
      callActive, joined, muted, isRoomCreator,
      startCall, joinCall, leaveCall, toggleMute,
      errors: voiceError, remoteStreams
    }
  };

  const topBarProps = {
    language,
    handleLanguageChange,
    runCode,
    setIsAiModalOpen,
  };

  const editorPanelProps = {
    language,
    code,
    handleEditorChange,
  };

  const aiModalProps = {
    isOpen: isAiModalOpen,
    prompt: aiPrompt,
    setPrompt: setAiPrompt,
    isGenerating: isGenerating,
    generatedCode: generatedCode,
    onGenerate: handleGenerateCode,
    onInsert: insertGeneratedCode,
    onClose: () => setIsAiModalOpen(false),
  };

  if (!isMobile) {
    return (
      <div className="h-screen bg-[#0d1117] text-[#c9d1d9] font-sans">
        <PanelGroup direction="horizontal">
          <Panel
            ref={sidebarPanelRef}
            collapsible={true}
            onCollapse={() => setSidebarCollapsed(true)}
            onExpand={() => setSidebarCollapsed(false)}
            defaultSize={20}
            minSize={20}
            maxSize={20}
            collapsedSize={0}
          >
            <Sidebar isCollapsed={isSidebarCollapsed} {...sidebarProps} />
          </Panel>
          <PanelResizeHandle className="relative w-1.5 bg-[#161b22] hover:bg-blue-600 transition-colors">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <button
                onClick={toggleSidebar}
                className="z-10 w-6 h-6 bg-neutral-700 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer"
                title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {isSidebarCollapsed ? <FaChevronRight size={10} /> : <FaChevronLeft size={10} />}
              </button>
            </div>
          </PanelResizeHandle>
          <Panel defaultSize={80} minSize={30}>
            <main className="flex-1 flex flex-col p-4 gap-4 h-full overflow-hidden">
              <TopBar {...topBarProps} />
              <PanelGroup direction="vertical" className="flex-1 min-h-0">
                <Panel defaultSize={65} minSize={20}>
                  <EditorPanel {...editorPanelProps} />
                </Panel>
                <PanelResizeHandle className="h-1 bg-[#30363d] hover:bg-blue-500 transition-colors" />
                <Panel defaultSize={35} minSize={10}>
                  <OutputPanel output={output} />
                </Panel>
              </PanelGroup>
            </main>
          </Panel>
        </PanelGroup>
        <AiAssistantModal {...aiModalProps} />
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0d1117] text-[#c9d1d9] font-sans flex flex-col">
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-full max-w-xs z-50"
            >
              <Sidebar
                isMobile
                onClose={() => setMobileMenuOpen(false)}
                {...sidebarProps}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col p-2 sm:p-4 gap-4 overflow-hidden">
        <TopBar
          isMobile
          onMenuClick={() => setMobileMenuOpen(true)}
          {...topBarProps}
        />
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          <div className="flex-1 min-h-0">
            <EditorPanel {...editorPanelProps} />
          </div>
          <div className="flex-1 min-h-0">
            <OutputPanel output={output} />
          </div>
        </div>
      </main>
      <AiAssistantModal {...aiModalProps} />
    </div>
  );
}

export default EditorPage;