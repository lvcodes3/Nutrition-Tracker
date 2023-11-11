// express router //
const express = require('express');
const router = express.Router();

// authentication middleware //
const protect = require('../middlewares/authentication.js');

// nutrition controller logic //
const nutritionController = require('../controllers/nutritionController.js');

// private routes //
router.post('/addBreakfast', protect, nutritionController.addBreakfast);
router.post('/addLunch', protect, nutritionController.addLunch);
router.post('/addDinner', protect, nutritionController.addDinner);
router.post('/addSnack', protect, nutritionController.addSnack);
router.post('/getDailyMeals', protect, nutritionController.getDailyMeals);

module.exports = router;