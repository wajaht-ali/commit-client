/* eslint-disable no-unused-vars */

import { FaCopy, FaMicrophone, FaUsers, FaTimes } from 'react-icons/fa';
import { UserAvatar, copyRoomId } from '../../../utils/Utilities';
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import VoiceControls from '../../../voice/VoiceControls';
import RemoteAudioGrid from '../../../voice/RemoteAudioGrid';

const Sidebar = ({
    isMobile,
    isCollapsed,
    onClose,
    roomId,
    connectedUsers,
    leaveRoom,
    voiceProps
}) => {
    if (!isMobile && isCollapsed) {
        return (
            <div className="bg-[#161b22] h-full p-2 flex flex-col items-center justify-between border-r border-[#30363d]">
                <div className="flex flex-col items-center gap-6 mt-2">
                    <div className="text-xl font-bold text-white">C</div>
                    <div className="relative group">
                        <FaUsers size={20} className="text-neutral-400" />
                        <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {connectedUsers.length} Users
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <aside className="w-full h-full bg-[#161b22] p-4 flex flex-col shrink-0 border-r border-[#30363d]">
            <div className="flex justify-between items-center mb-4 border-b border-[#30363d] pb-2">
                <h1 className="text-2xl font-bold text-white">Commit</h1>
                {isMobile && (
                    <button onClick={onClose} className="p-2 text-neutral-400 hover:text-white" title="Close Menu">
                        <FaTimes size={20} />
                    </button>
                )}
            </div>

            <section>
                <h2 className="text-lg font-semibold mb-2 text-white">Voice</h2>
                <div className="bg-[#0d1117] border border-[#30363d] rounded-md p-3 mb-2">
                    <VoiceControls
                        callActive={voiceProps.callActive}
                        joined={voiceProps.joined}
                        muted={voiceProps.muted}
                        isRoomCreator={voiceProps.isRoomCreator}

                        onStart={voiceProps.startCall}
                        onJoin={voiceProps.joinCall}
                        onLeave={voiceProps.leaveCall}
                        onToggleMute={voiceProps.toggleMute}
                    />
                </div>
                {voiceProps.errors && <p className="text-red-400 text-xs mt-2">{voiceProps.errors}</p>}
                <RemoteAudioGrid remoteStreams={voiceProps.remoteStreams} connectedUsers={connectedUsers} />
            </section>

            <div className="flex-1 flex flex-col overflow-hidden mt-4">
                <h2 className="text-lg font-semibold mb-2 text-white">Connected Users ({connectedUsers.length})</h2>
                <div className="flex flex-col gap-2 overflow-y-auto pr-1">
                    {connectedUsers.map((user) => (
                        <div key={user.socketId} className="flex items-center gap-3 bg-[#0d1117]/60 rounded-md px-3 py-1.5">
                            <div className="relative">
                                <UserAvatar username={user.username} />
                                {user.inVoiceCall && (
                                    <span className="absolute bottom-0 right-0 bg-green-500 border-2 border-[#161b22] rounded-full p-[3px]" title="In Voice Call">
                                        <FaMicrophone size={8} className="text-white" />
                                    </span>
                                )}
                            </div>
                            <span className="text-sm">{user.username}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-row items-center justify-between bg-[#0d1117] border border-[#30363d] rounded-md p-1">
                <div className="flex items-center space-x-2 rounded-md px-2 py-1 group">
                    <span className="text-neutral-400 text-xs">Room:</span>
                    <span className="font-mono text-blue-400 text-xs group-hover:cursor-pointer" onClick={() => copyRoomId(roomId)}>{roomId}</span>
                    <button onClick={() => copyRoomId(roomId)} title="Copy Room ID" className="text-neutral-400 hover:text-blue-400 transition-colors">
                        <FaCopy className='hover:cursor-pointer' size={12} />
                    </button>
                </div>
                <button onClick={leaveRoom} className="w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 px-2 rounded-lg transition-all">
                    <span className='flex flex-row items-center'>Leave <HiOutlineArrowLeftCircle className='ml-1 mt-1' /></span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;