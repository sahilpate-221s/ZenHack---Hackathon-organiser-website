
const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    designation: { type: String, required: true },
    linkedIn: { type: String, required: true },
    collegeName: { type: String, required: true },
    city: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    numberRegistered: { type: Number, required: true },
    teamSize: { type: String, required: true }
});

const Hackathon = mongoose.model('Hackathon', hackathonSchema);

module.exports = Hackathon;
