require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const userRoutes = require("./routes/userRoutes");
const userInvitationRoutes = require("./routes/userInvitationRoutes")

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json()); // Parse JSON requests
app.use("/api", userRoutes);
app.use("/api", userInvitationRoutes);

// WebSocket connection
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("message", (data) => {
        console.log("Message received:", data);
        socket.broadcast.emit("message", data);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
