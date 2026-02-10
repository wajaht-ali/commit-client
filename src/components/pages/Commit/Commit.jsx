import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSocket } from '../../../context/SocketContext.jsx';
import { defaultCodeTemplates } from '../../../utils/Utilities.jsx';
import { useMediaQuery } from '../../../context/QueriesContext.jsx';
import { useVoiceCall } from '../../../voice/useVoiceCall.js';
import { useRoomSocket } from '../../../hooks/useRoomSocket.js';
import { executeCode } from '../../../utils/codeExecutor.js';
import { generateCode, insertGeneratedCode } from '../../../utils/aiService.js';
import { handleLanguageSwitch } from '../../../utils/languageHandler.js';
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

const EditorPage = () => {
  const { roomId } = useParams();
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'javascript';
  });

  const [connectedUsers, setConnectedUsers] = useState([]);
  const [languageCodeMap, setLanguageCodeMap] = useState({});
  const [output, setOutput] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarPanelRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 1023px');
  const isRoomCreator = connectedUsers[0]?.socketId === socket?.id;

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

  const getCurrentCode = () => {
    return languageCodeMap[language] || defaultCodeTemplates[language] || '';
  };

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

  useEffect(() => {
    if (!languageCodeMap[language]) {
      setLanguageCodeMap(prev => ({
        ...prev,
        [language]: defaultCodeTemplates[language] || ''
      }));
    }
  }, [language, languageCodeMap]);

  useRoomSocket({
    socket,
    roomId,
    language,
    location,
    navigate,
    setConnectedUsers,
    setLanguageCodeMap,
    setLanguage,
    getCurrentCode,
  });

  const handleEditorChange = (value) => {
    setLanguageCodeMap(prev => ({
      ...prev,
      [language]: value
    }));
    if (socket) {
      socket.emit('code-change', { roomId, code: value });
    }
  };

  const handleLanguageChange = (e) => {
    handleLanguageSwitch(
      e.target.value,
      languageCodeMap,
      socket,
      roomId,
      setLanguage,
      setLanguageCodeMap
    );
  };

  const runCode = () => executeCode(language, getCurrentCode(), setOutput);

  const handleAiGenerate = () => {
    generateCode(aiPrompt, language, setGeneratedCode, setIsGenerating);
  };

  const handleAiInsert = () => {
    insertGeneratedCode(
      getCurrentCode(),
      generatedCode,
      language,
      socket,
      roomId,
      setLanguageCodeMap,
      setIsAiModalOpen,
      setAiPrompt,
      setGeneratedCode
    );
  };
  

  const leaveRoom = () => {
    localStorage.removeItem('selectedLanguage');
    if (socket) {
      socket.disconnect();
    }
    window.location.replace('/');
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
    onToggleCollapse: toggleSidebar,
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

  const aiModalProps = {
    isOpen: isAiModalOpen,
    prompt: aiPrompt,
    setPrompt: setAiPrompt,
    isGenerating: isGenerating,
    generatedCode: generatedCode,
    onGenerate: handleAiGenerate,
    onInsert: handleAiInsert,
    onClose: () => setIsAiModalOpen(false),
  };

  if (!isMobile) {
    return (
      <div
        className="h-screen text-[#c9d1d9] font-sans"
        style={{ backgroundColor: '#0a0e14' }}
      >
        <PanelGroup direction="horizontal">
          <Panel
            ref={sidebarPanelRef}
            collapsible={true}
            onCollapse={() => setSidebarCollapsed(true)}
            onExpand={() => setSidebarCollapsed(false)}
            defaultSize={20}
            minSize={5}
            maxSize={25}
            collapsedSize={5}
          >
            <Sidebar isCollapsed={isSidebarCollapsed} {...sidebarProps} />
          </Panel>
          <PanelResizeHandle
            className="w-1 transition-all cursor-col-resize"
            style={{ backgroundColor: '#1e2530' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1e2530';
            }}
          />
          <Panel defaultSize={80} minSize={30}>
            <main
              className="flex-1 flex flex-col gap-3 h-full overflow-hidden"
              style={{ backgroundColor: '#0a0e14' }}
            >
              <PanelGroup direction="vertical" className="flex-1 min-h-0">
                <Panel defaultSize={70} minSize={20}>
                  <div
                    className="flex flex-col h-full  overflow-hidden border border-[#1e2530]"
                    style={{ backgroundColor: '#0f1419' }}
                  >
                    <TopBar {...topBarProps} />
                    <div className="flex-1 relative">
                      <EditorPanel language={language} code={getCurrentCode()} handleEditorChange={handleEditorChange} />
                    </div>
                  </div>
                </Panel>
                <PanelResizeHandle
                  className="h-1 transition-all cursor-row-resize"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                />
                <Panel defaultSize={30} minSize={15}>
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
    <div
      className="h-screen text-[#c9d1d9] font-sans flex flex-col"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {isMobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className={`fixed inset-0 bg-black/60 z-40 ${isMobileMenuOpen ? 'mobile-backdrop-open' : 'mobile-backdrop-close'}`}
          />
          <div
            className={`fixed top-0 left-0 h-full w-full max-w-xs z-50 ${isMobileMenuOpen ? 'mobile-sidebar-open' : 'mobile-sidebar-close'}`}
          >
            <Sidebar
              isMobile
              onClose={() => setMobileMenuOpen(false)}
              {...sidebarProps}
            />
          </div>
        </>
      )}

      <main className="flex-1 flex flex-col p-3 sm:p-4 gap-4 overflow-hidden">
        <TopBar
          isMobile
          onMenuClick={() => setMobileMenuOpen(true)}
          {...topBarProps}
        />
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          <div className="flex-1 min-h-0">
            <EditorPanel language={language} code={getCurrentCode()} handleEditorChange={handleEditorChange} />
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