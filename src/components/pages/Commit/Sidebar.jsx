/* eslint-disable no-unused-vars */

import { useState } from 'react';
import { FaCopy, FaMicrophone, FaPhone, FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { UserAvatar, copyRoomId } from '../../../utils/Utilities';
import VoiceControls from '../../../voice/VoiceControls';
import RemoteAudioGrid from '../../../voice/RemoteAudioGrid';

const Sidebar = ({
    isMobile,
    isCollapsed,
    onClose,
    onToggleCollapse,
    roomId,
    connectedUsers,
    leaveRoom,
    voiceProps,
    currentUserId
}) => {
    const [isVoiceExpanded, setIsVoiceExpanded] = useState(true);

    // Collapsed state - show only icons
    if (!isMobile && isCollapsed) {
        return (
            <div className="h-full flex flex-col" style={{ backgroundColor: '#0f1419' }}>
                {/* Logo */}
                <div className="p-4 flex justify-center">
                    <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: '#1a8f7d' }}
                    >
                        <span className="text-white text-sm font-bold">&lt;/&gt;</span>
                    </div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Expand button at bottom */}
                <div className="p-3 border-t" style={{ borderColor: '#1e2530' }}>
                    <button
                        onClick={onToggleCollapse}
                        className="w-full p-2 rounded-lg flex items-center justify-center transition-all"
                        style={{
                            backgroundColor: '#1a2028',
                            color: '#8b949e'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#252d38';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#1a2028';
                        }}
                    >
                        <FaChevronRight size={12} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <aside className="w-full h-full flex flex-col" style={{ backgroundColor: '#0f1419' }}>
            {/* Header with Logo */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: '#1a8f7d' }}
                    >
                        <span className="text-white text-sm font-bold">&lt;/&gt;</span>
                    </div>
                    <span className="text-white font-semibold text-lg">Commit</span>
                </div>
                {isMobile && (
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg transition-all"
                        style={{ color: '#8b949e' }}
                    >
                        <FaTimes size={18} />
                    </button>
                )}
            </div>

            {/* Voice Chat Section */}
            <div className="px-4 mb-4 ">
                <button
                    onClick={() => setIsVoiceExpanded(!isVoiceExpanded)}
                    className="w-full flex items-center cursor-pointer justify-between py-2 transition-all"
                    style={{ color: '#8b949e' }}
                >
                    <div className="flex items-center gap-2 ">
                        <FaPhone size={14} />
                        <span className="text-sm font-medium">Voice Chat</span>
                    </div>
                    {isVoiceExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                </button>

                {isVoiceExpanded && (
                    <div className="mt-2">
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
                        <p className="text-xs mt-2" style={{ color: '#6e7681' }}>
                            No remote audio yet...
                        </p>
                        {voiceProps.errors && (
                            <p
                                className="text-xs mt-2 px-2 py-1 rounded"
                                style={{
                                    color: '#f87171',
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)'
                                }}
                            >
                                {voiceProps.errors}
                            </p>
                        )}
                        <RemoteAudioGrid remoteStreams={voiceProps.remoteStreams} connectedUsers={connectedUsers} />
                    </div>
                )}
            </div>

            {/* Connected Users */}
            <div className="flex-1 overflow-hidden flex flex-col px-4">
                <h2
                    className="text-xs font-medium uppercase tracking-wider mb-3"
                    style={{ color: '#6e7681' }}
                >
                    Connected Users ({connectedUsers.length})
                </h2>
                <div className="flex-1 overflow-y-auto space-y-1 editor-scrollbar">
                    {connectedUsers.map((user, index) => {
                        const isCurrentUser = index === 0; // First user is typically current user
                        return (
                            <div
                                key={user.socketId}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all"
                                style={{ backgroundColor: '#1a2028' }}
                            >
                                <div className="relative">
                                    <UserAvatar username={user.username} />
                                    {user.inVoiceCall && (
                                        <span
                                            className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center pulse-indicator"
                                            style={{
                                                backgroundColor: '#10b981',
                                                border: '2px solid #0f1419'
                                            }}
                                        >
                                            <FaMicrophone size={6} className="text-white" />
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    {isCurrentUser ? (
                                        <>
                                            <span className="text-sm font-medium" style={{ color: '#3b82f6' }}>You</span>
                                            <span className="text-xs" style={{ color: '#6e7681' }}>({user.username})</span>
                                        </>
                                    ) : (
                                        <span className="text-sm" style={{ color: '#e6edf3' }}>{user.username}</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Room ID */}
            <div className="px-4 mt-4">
                <h2
                    className="text-xs font-medium uppercase tracking-wider mb-2"
                    style={{ color: '#6e7681' }}
                >
                    Room ID
                </h2>
                <div
                    className="flex items-center justify-between px-3 py-2 rounded-lg"
                    style={{ backgroundColor: '#1a2028' }}
                >
                    <span className="font-mono text-sm" style={{ color: '#e6edf3' }}>{roomId}</span>
                    <button
                        onClick={() => copyRoomId(roomId)}
                        className="p-1.5 rounded transition-all"
                        style={{ color: '#6e7681' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#e6edf3';
                            e.currentTarget.style.backgroundColor = '#252d38';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#6e7681';
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        title="Copy Room ID"
                    >
                        <FaCopy size={14} />
                    </button>
                </div>
            </div>

            {/* Leave Room Button */}
            <div className="px-4 mt-4">
                <button
                    onClick={leaveRoom}
                    className="w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
                    style={{
                        backgroundColor: '#dc2626',
                        color: 'white'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#b91c1c';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#dc2626';
                    }}
                >
                    Leave Room
                    <HiOutlineArrowRightOnRectangle size={18} />
                </button>
            </div>

            {/* Collapse Button - Footer */}
            {!isMobile && (
                <div className="p-4 mt-2 border-t" style={{ borderColor: '#1e2530' }}>
                    <button
                        onClick={onToggleCollapse}
                        className="w-auto py-2 px-3 rounded-[3px] flex items-center justify-center gap-2 text-sm transition-all"
                        style={{
                            backgroundColor: '#1a2028',
                            color: '#8b949e'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#252d38';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#1a2028';
                        }}
                    >
                        <FaChevronLeft size={12} />
                    </button>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;