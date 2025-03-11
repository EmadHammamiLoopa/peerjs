require('dotenv').config();
const express = require("express");
const { ExpressPeerServer } = require("peer");
const cors = require("cors");

// Initialize Express App
const app = express();

// Enable CORS for all requests
app.use(cors());

// Get port from environment variables (default: 9000)
const PORT = process.env.PORT || 9000;
const PEER_PATH = process.env.PEER_PATH || "/peerjs";

// Create a PeerJS Server
const server = app.listen(PORT, () => {
    console.log(`✅ PeerJS server is running on port ${PORT}`);
});

// PeerJS options (optional)
const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: "/peerjs", // 🔹 Ensure PeerJS is always at /peerjs
    allow_discovery: true
});

// ✅ Attach PeerJS to Express
app.use("/peerjs", peerServer);


// Attach PeerJS to Express
app.use(PEER_PATH, peerServer);

// Health check endpoint
app.get("/", (req, res) => {
    res.send("✅ PeerJS Signaling Server is Running!");
});

// Handle errors
peerServer.on("error", (err) => {
    console.error("❌ PeerJS Error:", err);
});

const PEER_SERVER_URL = process.env.RENDER_PEER_URL || `http://localhost:${PORT}${PEER_PATH}`;

console.log(`✅ PeerJS server is ready at: ${PEER_SERVER_URL}`);

