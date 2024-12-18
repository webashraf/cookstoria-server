import { Server as HttpServer } from "http";
import { Server } from "socket.io";

const socketServer = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  // Initialize Socket.IO
  io.on("connection", (socket) => {
    console.log("connected socket" + socket.id);
    socket.on("disconnect", () => {
      console.log("disconnected" + socket.id);
    });
  });
};

export default socketServer;
