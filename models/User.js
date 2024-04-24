const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['participant', 'judge'], default: 'participant' },
    // Add more fields as needed
});



// userSchema.post('save', async function(doc) {
//     try {
//         console.log('New user saved:', doc);

//         // Create Nodemailer transporter
//         let transporter = nodemailer.createTransport({
//             host: process.env.MAIL_HOST,
//             auth: {
//                 user: process.env.MAIL_USER,
//                 pass: process.env.MAIL_PASS,
//             },
//         });

//         // Send email to the new user
//         let info = await transporter.sendMail({
//             from: `Sahil Patel -- <${process.env.MAIL_USER}>`,
//             to: doc.email,
//             subject: 'Welcome to Our Platform',
//             html: `<h2>Welcome, ${doc.username}!</h2>
//             <p>Thank you for joining our platform.</p>`,
//         });

//         console.log('Email sent:', info);
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// });



const User = mongoose.model('User', userSchema);
module.exports = User;
