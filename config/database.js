// config/database.js
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URI
const mongoURL = process.env.MONGO_URL;
// const mongoURL = "mongodb://localhost:27017/hackathon-platform";
// Connect to MongoDB
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

module.exports = mongoose.connection;
