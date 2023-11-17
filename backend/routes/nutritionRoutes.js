// express router //
const express = require('express');
const router = express.Router();

// authentication middleware //
const protect = require('../middlewares/authentication.js');

// nutrition controller logic //
const nutritionController = require('../controllers/nutritionController.js');

// private routes //
router.post('/addMeal', protect, nutritionController.addMeal);
router.post('/updateMeal', protect, nutritionController.updateMeal);
router.post('/deleteMeal', protect, nutritionController.deleteMeal);
router.post('/getDailyMeals', protect, nutritionController.getDailyMeals);

module.exports = router;