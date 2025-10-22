/* eslint-disable no-unused-vars */

import { useEffect, useRef, useState, useCallback } from "react";
import { RTC_CONFIG } from "../utils/Utilities.jsx";

function createPeerConnection(localStream, onTrack, onIce) {
  const pc = new RTCPeerConnection(RTC_CONFIG);

  if (localStream) {
    localStream.getTracks().forEach((t) => pc.addTrack(t, localStream));
  }

  pc.ontrack = (evt) => {
    const [stream] = evt.streams;
    if (stream) onTrack(stream);
  };

  pc.onicecandidate = (evt) => {
    if (evt.candidate) onIce(evt.candidate);
  };

  return pc;
}

export function useVoiceCall({ socket, roomId, isRoomCreator }) {
  const [callActive, setCallActive] = useState(false);
  const [joined, setJoined] = useState(false);
  const [muted, setMuted] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [errors, setErrors] = useState(null);

  const localStreamRef = useRef(null);
  const peersRef = useRef(new Map());
  const remoteStreamsRef = useRef(new Map());
  const [remoteStreams, setRemoteStreams] = useState([]);

  const addRemoteStream = useCallback((socketId, stream) => {
    remoteStreamsRef.current.set(socketId, stream);
    setRemoteStreams(
      Array.from(remoteStreamsRef.current, ([id, s]) => ({
        socketId: id,
        stream: s,
      }))
    );
  }, []);

  const removeRemoteStream = useCallback((socketId) => {
    remoteStreamsRef.current.delete(socketId);
    setRemoteStreams(
      Array.from(remoteStreamsRef.current, ([id, s]) => ({
        socketId: id,
        stream: s,
      }))
    );
  }, []);

  const startCall = useCallback(() => {
    socket.emit("voice:start", { roomId });
  }, [socket, roomId]);

  const joinCall = useCallback(async () => {
    try {
      if (!localStreamRef.current) {
        localStreamRef.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        localStreamRef.current
          .getAudioTracks()
          .forEach((t) => (t.enabled = true));
        setMuted(false);
      }
      socket.emit("voice:join", { roomId });
      setJoined(true);
    } catch (err) {
      console.error(err);
      setErrors(err.message || "Failed to access microphone");
    }
  }, [socket, roomId]);

  const leaveCall = useCallback(() => {
    socket.emit("voice:leave", { roomId });
    setJoined(false);

    peersRef.current.forEach((pc, id) => {
      try {
        pc.getSenders().forEach((s) => s.track && s.track.stop());
      } catch (err) {
        console.error("Error stopping tracks:", err);
      }
      try {
        pc.close();
      } catch (err) {
        console.error("Error stopping tracks:", err);
      }
      removeRemoteStream(id);
    });
    peersRef.current.clear();

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
  }, [socket, roomId, removeRemoteStream]);

  const toggleMute = useCallback(() => {
    if (!localStreamRef.current) return;
    const next = !muted;
    localStreamRef.current.getAudioTracks().forEach((t) => (t.enabled = !next));
    setMuted(next);
    socket.emit("voice:mute", { roomId, muted: next });
  }, [muted, socket, roomId]);

  useEffect(() => {
    if (!socket) return;

    const onStarted = () => setCallActive(true);
    const onEnded = () => {
      setCallActive(false);
      leaveCall();
    };
    const onRoster = ({ callActive, participants }) => {
      setCallActive(callActive);
      setParticipants(participants || []);
    };
    const onPeerJoin = async ({ socketId: peerId }) => {
      const pc = createPeerConnection(
        localStreamRef.current,
        (stream) => addRemoteStream(peerId, stream),
        (candidate) =>
          socket.emit("voice:ice-candidate", {
            roomId,
            targetId: peerId,
            candidate,
          })
      );
      peersRef.current.set(peerId, pc);

      try {
        const offer = await pc.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: false,
        });
        await pc.setLocalDescription(offer);
        socket.emit("voice:offer", { roomId, targetId: peerId, sdp: offer });
      } catch (e) {
        console.error("Offer error:", e);
      }
    };

    const onOffer = async ({ fromId, sdp }) => {
      const pc = createPeerConnection(
        localStreamRef.current,
        (stream) => addRemoteStream(fromId, stream),
        (candidate) =>
          socket.emit("voice:ice-candidate", {
            roomId,
            targetId: fromId,
            candidate,
          })
      );
      peersRef.current.set(fromId, pc);

      try {
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("voice:answer", { roomId, targetId: fromId, sdp: answer });
      } catch (e) {
        console.error("Answer error:", e);
      }
    };

    const onAnswer = async ({ fromId, sdp }) => {
      const pc = peersRef.current.get(fromId);
      if (!pc) return;
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
      } catch (e) {
        console.error("Remote desc error:", e);
      }
    };

    const onIce = async ({ fromId, candidate }) => {
      const pc = peersRef.current.get(fromId);
      if (!pc || !candidate) return;
      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) {
        console.error("ICE add error:", e);
      }
    };

    const onPeerLeave = ({ socketId: peerId }) => {
      const pc = peersRef.current.get(peerId);
      if (pc) {
        try {
          pc.close();
        } catch (err) {
          console.error("Error stopping tracks:", err);
        }
        peersRef.current.delete(peerId);
      }
      removeRemoteStream(peerId);
    };

    const onPeerMuted = ({ socketId, muted }) => {
      // Optional: handle peer mute state if needed
    };

    const onError = ({ message }) => setErrors(message);

    socket.on("voice:started", onStarted);
    socket.on("voice:ended", onEnded);
    socket.on("voice:roster", onRoster);
    socket.on("voice:peer-join", onPeerJoin);
    socket.on("voice:offer", onOffer);
    socket.on("voice:answer", onAnswer);
    socket.on("voice:ice-candidate", onIce);
    socket.on("voice:peer-leave", onPeerLeave);
    socket.on("voice:peer-muted", onPeerMuted);
    socket.on("voice:error", onError);

    return () => {
      socket.off("voice:started", onStarted);
      socket.off("voice:ended", onEnded);
      socket.off("voice:roster", onRoster);
      socket.off("voice:peer-join", onPeerJoin);
      socket.off("voice:offer", onOffer);
      socket.off("voice:answer", onAnswer);
      socket.off("voice:ice-candidate", onIce);
      socket.off("voice:peer-leave", onPeerLeave);
      socket.off("voice:peer-muted", onPeerMuted);
      socket.off("voice:error", onError);
    };
  }, [socket, roomId, addRemoteStream, removeRemoteStream, leaveCall]);

  useEffect(() => {
    return () => {
      try {
        leaveCall();
      } catch (err) {
        console.error("Error stopping tracks:", err);
      }
    };
  }, []);

  return {
    callActive,
    joined,
    muted,
    remoteStreams,
    errors,
    startCall,
    joinCall,
    leaveCall,
    toggleMute,
  };
}
