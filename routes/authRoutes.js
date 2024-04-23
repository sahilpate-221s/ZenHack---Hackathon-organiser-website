const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// Register a new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);


// Example route that requires authentication
// router.get('/profile', isAuthenticated, (req, res) => {
//     res.json({ message: 'User profile' });
// });

module.exports = router;

