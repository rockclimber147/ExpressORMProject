const express = require("express");
const { userRepository } = require("../config/db");

const router = express.Router();


router.get("/users", async (req, res) => {
    try {
        const users = await userRepository.getAllUsers(); // Fetch all users
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new user
router.post("/users", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await userRepository.createUser(username, email, password);
        res.status(201).json({ id: user.id, username: user.username, email: user.email });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Send friend request
router.post("/friends/request", async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const friendRequest = await userRepository.sendFriendRequest({ senderId, receiverId });
        res.status(201).json(friendRequest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;