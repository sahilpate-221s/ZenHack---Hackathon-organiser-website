// config/database.js

const mongoose = require('mongoose');

// MongoDB connection URI
const mongoURI = 'mongodb://localhost/hackathon-platform';

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

module.exports = mongoose.connection;
