// client/src/voice/RemoteAudioGrid.jsx
import { useEffect, useRef } from "react";

function RemoteAudio({ stream, label }) {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            ref.current.srcObject = stream;
            ref.current.play().catch(() => { });
        }
    }, [stream]);
    return (
        <div className="flex items-center gap-2 bg-gray-800 rounded px-2 py-1">
            <audio ref={ref} autoPlay playsInline />
            <span className="text-xs text-gray-300">{label}</span>
        </div>
    );
}

export default function RemoteAudioGrid({ remoteStreams, connectedUsers }) {
    const nameMap = new Map(connectedUsers.map(u => [u.socketId, u.username]));
    return (
        <div className="flex flex-col gap-2">
            {remoteStreams.length === 0 ? (
                <></>
            ) : (
                remoteStreams.map(({ socketId, stream }) => (
                    <RemoteAudio
                        key={socketId}
                        stream={stream}
                        label={nameMap.get(socketId) || socketId}
                    />
                ))
            )}
        </div>
    );
}
