// userService.js

// Assuming you're using MongoDB with Mongoose
const User = require('../models/User'); // Assuming you have a User model defined

function getUsernameFromBackend(userId) {
    // Assuming userId is available, for example, from the request object
    // You need to implement the logic to retrieve the username based on the userId
    return new Promise((resolve, reject) => {
        User.findById(userId, (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user.username); // Assuming 'username' is a field in your User model
            }
        });
    });
}

module.exports = {
    getUsernameFromBackend
};
