"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const socketServer = (server) => {
    const io = new socket_io_1.Server(server, {
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
exports.default = socketServer;
