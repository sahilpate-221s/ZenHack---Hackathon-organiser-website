const express = require('express');
const Hackathon = require('../models/Hackathon');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { username, email, number, designation, linkedIn, collegeName, city, hackathonbefore, hackathonname, hackathonnature, hackathonbrief, date, numberofregistration, teamSize } = req.body;

        const hackathon = new Hackathon({
            username,
            email,
            designation,
            linkedIn,
            collegeName,
            city,
            title: hackathonname,
            description: hackathonbrief,
            startDate: date,
            numberRegistered: numberofregistration,
            teamSize
        });

        await hackathon.save();

        res.status(201).json({ message: 'Hackathon request submitted successfully' });
    } catch (error) {
        console.error('Error saving hackathon request:', error);
        res.status(500).json({ message: 'Failed to submit hackathon request' });
    }
});

module.exports = router;
