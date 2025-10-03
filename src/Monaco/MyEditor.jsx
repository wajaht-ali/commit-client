import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useSocket } from "../context/SocketContext";

const EditorPage = () => {
  const { roomId } = useParams();
  const socket = useSocket();
  const [code, setCode] = useState("// Start coding here...");

  useEffect(() => {
    if (!socket) return;
    socket.emit("join-room", roomId);

    const handleCodeUpdate = (newCode) => {
      setCode(newCode);
    };
    socket.on("code-update", handleCodeUpdate);

    socket.on("user-joined", (socketId) => {
      console.log(`User ${socketId} joined the room.`);
    });

    return () => {
      socket.off("code-update", handleCodeUpdate);
      socket.off("user-joined");
    };
  }, [socket, roomId]);

  const handleEditorChange = (value) => {
    setCode(value);
    if (socket) {
      socket.emit("code-change", { roomId, code: value });
    }
  };

  return (
    <div>
      <h2>Room ID: {roomId}</h2>
      <Editor
        height="90vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        value={code}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default EditorPage;