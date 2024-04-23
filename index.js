const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const mongooseConnection = require('./config/database');
const User = require('./models/User');
const Hackathon = require('./models/Hackathon');
const authRoutes = require('./routes/authRoutes');
const hackathonRoutes = require('./routes/hackathonRoutes');

const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//initialize mongoDB



// Endpoint to retrieve username dynamically
app.get('/getUsername', async (req, res) => {
    try {
        // Assuming you have the user's email available in req.query.email
        const userEmail = req.query.email;
        
        // Find the user by email in the database
        const user = await User.findOne({ email: userEmail });

        // If user is found, send back the username
        if (user) {
            res.json({ username: user.username ,email : user.email});
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error retrieving username:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// for the form 

app.get('/api/hackathons', async (req, res) => {
    try {
        // Fetch the hackathons from your database (this is a placeholder, you need to implement this based on your database schema)
        const hackathons = await Hackathon.find();

        // Return the hackathons as JSON
        res.json(hackathons);
    } catch (error) {
        console.error('Error fetching hackathons:', error);
        res.status(500).json({ error: 'Failed to fetch hackathons' });
    }
});














// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hackathon', hackathonRoutes);

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
