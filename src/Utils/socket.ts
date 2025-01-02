import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3100"; // Replace with your server URL

let socket:any;

export const initializeSocket = (userId: any) => {
  if (!socket) {
    // Initialize the Socket.IO client only once
    socket = io(SOCKET_URL, {
      transports: ["websocket"], // Ensures WebSocket is used for better performance
    });

    // Handle connection event
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server:", socket.id);

      // Register the user after connection is established
      socket.emit("registerUser", { userId, socketId: socket.id });
    });

    // Handle disconnection event
    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });
  }
  return socket;
};
