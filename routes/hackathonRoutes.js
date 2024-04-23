const express = require('express');
const Hackathon = require('../models/Hackathon');


const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        // Fetch all the data from the request body
        const { username, email, number, designation, linkedIn, collegeName, city, hackathonbefore, hackathonname, hackathonnature, hackathonbrief, date, numberofregistration, teamSize } = await req.body;
        
        console.log(username, email, number, designation, linkedIn, collegeName, city, hackathonbefore, hackathonname, hackathonnature, hackathonbrief, date, numberofregistration, teamSize);

        // Create a new instance of the Hackathon model with the fetched data
        const hackathon = new Hackathon({
            username,
            email,
            designation,
            linkedIn,
            collegeName,
            city,
            title:hackathonname,

            description : hackathonbrief,
            
            startDate : date,
            numberRegistered :numberofregistration ,
            teamSize
        });

        
      

        // Save the new instance to the database
        await hackathon.save();

        // Respond with a success message
        res.status(201).json({ message: 'Hackathon request submitted successfully' });
    } catch (error) {
        console.error('Error saving hackathon request:', error);
        res.status(500).json({ message: 'Failed to submit hackathon request' });
    }
});

module.exports = router;