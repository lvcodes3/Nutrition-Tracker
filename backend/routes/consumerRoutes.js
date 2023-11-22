// express router //
const express = require('express');
const router = express.Router();

// authentication middleware //
const protect = require('../middlewares/authentication.js');

// consumer controller logic //
const consumerController = require('../controllers/consumerController.js');

// public routes //
router.post('/register', consumerController.registerConsumer);
router.post('/login', consumerController.loginConsumer);
router.post('/logout', consumerController.logoutConsumer);

// private routes //
router.get('/auth', protect, consumerController.authConsumer);
router.post('/searchByFirstName', protect, consumerController.searchByFirstName);
router.post('/sendFriendRequest', protect, consumerController.sendFriendRequest);
router.get('/getFriendRequests', protect, consumerController.getFriendRequests);
router.post('/acceptFriendRequest', protect, consumerController.acceptFriendRequest);
router.post('/declineFriendRequest', protect, consumerController.declineFriendRequest);

module.exports = router;