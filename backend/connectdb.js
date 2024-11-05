const mongoose = require('mongoose');
const User = require('./models/User'); // adjust path as needed
const News = require('./models/News'); // adjust path as needed

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');

    // Create a test user
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });

    // Create a test news item
    await News.create({
      title: 'Test News',
      url: 'http://example.com',
      author: user._id,
      content: 'This is a test news item'
    });

    console.log('Test data created');
  } catch (error) {
    console.error('Error:', error);
  }
};

connectDB();