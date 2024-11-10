const mongoose = require('mongoose');

// Connect to database
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB Connected');
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
      process.exit(1);
    }
  };

module.exports = connectDB;