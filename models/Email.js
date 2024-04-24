const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    hackathonname: { type: String, required: true },
    date: { type: Date, required: true },
    city: { type: String, required: true }
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
