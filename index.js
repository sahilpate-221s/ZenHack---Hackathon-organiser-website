// Add necessary imports
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const User = require('./models/User');
const Hackathon = require('./models/Hackathon');
const authRoutes = require('./routes/authRoutes');
const Email = require('./models/Email');
const hackathonRoutes = require('./routes/hackathonRoutes');
require('dotenv').config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Endpoint to retrieve username dynamically
app.get('/getUsername', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.query.email });
        if (user) {
            res.json({ username: user.username });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching username:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to fetch hackathons
app.get('/api/hackathons', async (req, res) => {
    try {
        const hackathons = await Hackathon.find();
        res.json(hackathons);
    } catch (error) {
        console.error('Error fetching hackathons:', error);
        res.status(500).json({ error: 'Failed to fetch hackathons' });
    }
});

// Endpoint to handle email sending
app.post('/sendEmail', async (req, res) => {
    const { username, email, hackathonname, date, city } = req.body;
    try {
        // Save email data to MongoDB
        const newEmail = new Email({
            username,
            email,
            hackathonname,
            date,
            city
        });
        await newEmail.save();

        // Send email using nodemailer
        let transporter = nodemailer.createTransport({
            service: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
        let mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Hackathon Registration Confirmation',
            text: `Dear ${username},\n\nThank you for registering for the hackathon "${hackathonname}".\n\nEvent Details:\nDate: ${date}\nCity: ${city}\n\nWe look forward to seeing you at the event!\n\nBest regards,\nThe Hackathon Team`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).send('Failed to send email');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Email sent successfully');
            }
        });
    } catch (error) {
        console.error('Error saving email to MongoDB:', error);
        res.status(500).json({ error: 'Failed to save email' });
    }
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/hackathon', hackathonRoutes);

// Start the server
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
