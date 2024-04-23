const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: true },
    // contactNumber: { type: String, required: false },
    designation: { type: String, required: true },
    linkedIn: { type: String, required: true },
    collegeName: { type: String, required: true },
    city: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: String, required: true },
    numberRegistered: { type: String, required: true },
    teamSize: { type: String, required: true },
});

const Hackathon = mongoose.model('Hackathon', hackathonSchema);
module.exports = Hackathon;
