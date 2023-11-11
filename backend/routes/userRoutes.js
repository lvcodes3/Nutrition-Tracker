// express router //
const express = require('express');
const router = express.Router();

// authentication middleware //
const protect = require('../middlewares/authentication.js');

// user controller logic //
const userController = require('../controllers/userController.js');

// public routes //
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

// private routes //
router.get('/auth', protect, userController.authUser);

module.exports = router;