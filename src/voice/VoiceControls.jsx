// client/src/voice/VoiceControls.jsx

export default function VoiceControls({
    callActive,
    joined,
    muted,
    isRoomCreator,
    onStart,
    onJoin,
    onLeave,
    onToggleMute,
}) {
    return (
        <div className="flex items-center gap-2">
            {isRoomCreator && !callActive && (
                <button
                    onClick={onStart}
                    className="text-white text-xs font-medium py-1.5 px-3 rounded-md transition-all"
                    style={{ backgroundColor: '#1a8f7d' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#157a6b';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#1a8f7d';
                    }}
                    title="Start voice call (creator only)"
                >
                    Start Call
                </button>
            )}

            {!isRoomCreator && !callActive && (
                <button
                    className="text-white text-xs font-medium py-1.5 px-3 rounded-md opacity-50 cursor-not-allowed"
                    style={{ backgroundColor: '#1a8f7d' }}
                    disabled
                    title="Waiting for host to start call"
                >
                    Start Call
                </button>
            )}

            {callActive && !joined && (
                <button
                    onClick={onJoin}
                    className="text-white text-xs font-medium py-1.5 px-3 rounded-md transition-all"
                    style={{ backgroundColor: '#3b82f6' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#2563eb';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#3b82f6';
                    }}
                    title="Join voice call"
                >
                    Join Call
                </button>
            )}

            {callActive && joined && (
                <>
                    <button
                        onClick={onToggleMute}
                        className="text-white text-xs font-medium py-1.5 px-3 rounded-md transition-all"
                        style={{ backgroundColor: muted ? '#f59e0b' : '#3d4452' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = muted ? '#d97706' : '#4d5563';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = muted ? '#f59e0b' : '#3d4452';
                        }}
                        title={muted ? "Unmute" : "Mute"}
                    >
                        {muted ? "Unmute" : "Mute"}
                    </button>
                    <button
                        onClick={onLeave}
                        className="text-white text-xs font-medium py-1.5 px-3 rounded-md transition-all"
                        style={{ backgroundColor: '#ef4444' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#dc2626';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#ef4444';
                        }}
                        title="Leave voice call"
                    >
                        Leave
                    </button>
                </>
            )}

            {!callActive && (
                <span
                    className="text-xs px-2 py-1 rounded"
                    style={{
                        color: '#6e7681',
                        backgroundColor: '#1a2028'
                    }}
                >
                    No active call
                </span>
            )}
        </div>
    );
}
