// models/Friend.js
const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    friendId: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Friend', friendSchema);