const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const authRoutes = require('./routes/auth');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});