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
        <div className="flex items-center gap-2 bg-gray-800 rounded-md px-2 py-2">
            {isRoomCreator && !callActive && (
                <button
                    onClick={onStart}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm py-1 px-3 rounded hover:cursor-pointer"
                    title="Start voice call (creator only)"
                >
                    Start Call
                </button>
            )}

            {callActive && !joined && (
                <button
                    onClick={onJoin}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm py-1 px-3 rounded hover:cursor-pointer"
                    title="Join voice call"
                >
                    Join
                </button>
            )}

            {callActive && joined && (
                <>
                    <button
                        onClick={onToggleMute}
                        className="bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm py-1 px-3 rounded hover:cursor-pointer"
                        title={muted ? "Unmute" : "Mute"}
                    >
                        {muted ? "Unmute" : "Mute"}
                    </button>
                    <button
                        onClick={onLeave}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm py-1 px-3 rounded hover:cursor-pointer"
                        title="Leave voice call"
                    >
                        Leave
                    </button>
                </>
            )}

            {!callActive && (
                <span className="text-gray-400 text-xs ml-1">No active call</span>
            )}
        </div>
    );
}
