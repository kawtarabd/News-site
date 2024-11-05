// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// Get user profile
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user profile'
        });
    }
});

// Add friend
router.post('/add-friend/:id', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.friends.includes(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Already friends with this user'
            });
        }
        user.friends.push(req.params.id);
        await user.save();
        res.json({
            success: true,
            message: 'Friend added successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding friend'
        });
    }
});

module.exports = router;