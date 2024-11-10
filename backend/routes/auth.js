const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const { register, login } = require('../controllers/authController')


// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', [
    check('firstName', 'Veuillez ajouter un prénom').not().isEmpty(),
    check('lastName', 'Veuillez ajouter un nom').not().isEmpty(),
    check('email', 'Veuillez ajouter un email valide').isEmail().normalizeEmail(),
    check('password', 'Veuillez entrer un mot de passe de 6 caractères ou plus').isLength({ min: 6 })
], register);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', [
  check('email', 'Veuillez inclure un email valide').isEmail().normalizeEmail(),
  check('password', 'Le mot de passe est requis').exists()
], login);

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Helper function to generate JWT
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

module.exports = router;