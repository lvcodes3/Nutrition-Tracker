const db = require('../db');
const { isEmpty } = require('../utils/helper.js');

const addBreakfast = (async (req, res) => {
    try {
        let {
            name,
            calories,
            totalFat,
            cholesterol,
            sodium,
            totalCarbohydrate,
            protein,
            timestamp
        } = req.body;

        // validate data //
        if (isEmpty(name) || name.length > 50) {
            return res.status(401).json({ err: 'Name is required and can only be up to 50 characters in length.'});
        }
        calories = (isEmpty(calories) ? null : parseFloat(calories));
        totalFat = (isEmpty(totalFat) ? null : parseFloat(totalFat));
        cholesterol = (isEmpty(cholesterol) ? null : parseFloat(cholesterol));
        sodium = (isEmpty(sodium) ? null : parseFloat(sodium));
        totalCarbohydrate = (isEmpty(totalCarbohydrate) ? null : parseFloat(totalCarbohydrate));
        protein = (isEmpty(protein) ? null : parseFloat(protein));
        if (isEmpty(timestamp)) {
            return res.status(401).json({ err: 'Timestamp is required.' });
        }

        // insert data //
        let result = await db.query(
            `INSERT into breakfasts
             (user_id, name, calories, total_fat, cholesterol, sodium, total_carbohydrate, protein, timestamp)
             VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING id;`,
            [req.user.id, name, calories, totalFat, cholesterol, sodium, totalCarbohydrate, protein, timestamp]
        );
        if (result.rowCount === 0) {
            return res.status(400).json({ err: 'Error adding breakfast.' });
        }

        return res.status(201).json({ msg: 'Breakfast added successfully.' });
    } catch (err) {
        console.log(`Error adding breakfast: ${err}`);
        return res.status(500).json({ err: 'Error adding breakfast.' });
    }
});

const addLunch = (async (req, res) => {
    try {
        let {
            name,
            calories,
            totalFat,
            cholesterol,
            sodium,
            totalCarbohydrate,
            protein,
            timestamp
        } = req.body;
    } catch (err) {
        console.log(`Error adding lunch: ${err}`);
        return res.status(500).json({ err: 'Error adding lunch.' });
    }
});

const addDinner = (async (req, res) => {
    try {
        let {
            name,
            calories,
            totalFat,
            cholesterol,
            sodium,
            totalCarbohydrate,
            protein,
            timestamp
        } = req.body;
    } catch (err) {
        console.log(`Error adding dinner: ${err}`);
        return res.status(500).json({ err: 'Error adding dinner.' });
    }
});

const addSnack = (async (req, res) => {
    try {
        let {
            name,
            calories,
            totalFat,
            cholesterol,
            sodium,
            totalCarbohydrate,
            protein,
            timestamp
        } = req.body;
    } catch (err) {
        console.log(`Error adding snack: ${err}`);
        return res.status(500).json({ err: 'Error adding snack.' });
    }
});

const getDailyMeals = (async (req, res) => {
    try {
        
    } catch (err) {
        console.log(`Error getting daily meals: ${err}`);
        return res.status(500).json({ err: 'Error getting daily meals.' });
    }
});

module.exports = {
    addBreakfast,
    addLunch,
    addDinner,
    addSnack,
    getDailyMeals
};