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
            consumedAt
        } = req.body;

        // validate data //
        if (isEmpty(name)) {
            return res.status(401).json({ err: 'Name is required.'});
        }
        else if (name.length > 50) {
            return res.status(401).json({ err: 'Name can only be up to 50 characters in length.'})
        }
        calories = (isEmpty(calories) ? null : parseInt(calories));
        totalFat = (isEmpty(totalFat) ? null : parseInt(totalFat));
        cholesterol = (isEmpty(cholesterol) ? null : parseInt(cholesterol));
        sodium = (isEmpty(sodium) ? null : parseInt(sodium));
        totalCarbohydrate = (isEmpty(totalCarbohydrate) ? null : parseInt(totalCarbohydrate));
        protein = (isEmpty(protein) ? null : parseInt(protein));
        if (isEmpty(consumedAt)) {
            return res.status(401).json({ err: 'Consumed at is required.' });
        }

        // insert data //
        let result = await db.query(
            `INSERT into breakfasts
             (user_id, name, calories, total_fat, cholesterol, sodium, total_carbohydrate, protein, consumed_at)
             VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING *;`,
            [req.user.id, name, calories, totalFat, cholesterol, sodium, totalCarbohydrate, protein, consumedAt]
        );
        if (result.rowCount === 0) {
            return res.status(400).json({ err: 'Error adding breakfast.' });
        }

        const newBreakfast = result.rows[0];
        return res.status(201).json(newBreakfast);
    } 
    catch (err) {
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
            consumedAt
        } = req.body;

        // validate data //
        if (isEmpty(name)) {
            return res.status(401).json({ err: 'Name is required.'});
        }
        else if (name.length > 50) {
            return res.status(401).json({ err: 'Name can only be up to 50 characters in length.'})
        }
        calories = (isEmpty(calories) ? null : parseInt(calories));
        totalFat = (isEmpty(totalFat) ? null : parseInt(totalFat));
        cholesterol = (isEmpty(cholesterol) ? null : parseInt(cholesterol));
        sodium = (isEmpty(sodium) ? null : parseInt(sodium));
        totalCarbohydrate = (isEmpty(totalCarbohydrate) ? null : parseInt(totalCarbohydrate));
        protein = (isEmpty(protein) ? null : parseInt(protein));
        if (isEmpty(consumedAt)) {
            return res.status(401).json({ err: 'Consumed at is required.' });
        }

        // insert data //
        let result = await db.query(
            `INSERT into lunches
             (user_id, name, calories, total_fat, cholesterol, sodium, total_carbohydrate, protein, consumed_at)
             VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING *;`,
            [req.user.id, name, calories, totalFat, cholesterol, sodium, totalCarbohydrate, protein, consumedAt]
        );
        if (result.rowCount === 0) {
            return res.status(400).json({ err: 'Error adding lunch.' });
        }

        const newLunch = result.rows[0];
        return res.status(201).json(newLunch);
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
            consumedAt
        } = req.body;

        // validate data //
        if (isEmpty(name)) {
            return res.status(401).json({ err: 'Name is required.'});
        }
        else if (name.length > 50) {
            return res.status(401).json({ err: 'Name can only be up to 50 characters in length.'})
        }
        calories = (isEmpty(calories) ? null : parseInt(calories));
        totalFat = (isEmpty(totalFat) ? null : parseInt(totalFat));
        cholesterol = (isEmpty(cholesterol) ? null : parseInt(cholesterol));
        sodium = (isEmpty(sodium) ? null : parseInt(sodium));
        totalCarbohydrate = (isEmpty(totalCarbohydrate) ? null : parseInt(totalCarbohydrate));
        protein = (isEmpty(protein) ? null : parseInt(protein));
        if (isEmpty(consumedAt)) {
            return res.status(401).json({ err: 'Consumed at is required.' });
        }

        // insert data //
        let result = await db.query(
            `INSERT into dinners
             (user_id, name, calories, total_fat, cholesterol, sodium, total_carbohydrate, protein, consumed_at)
             VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING *;`,
            [req.user.id, name, calories, totalFat, cholesterol, sodium, totalCarbohydrate, protein, consumedAt]
        );
        if (result.rowCount === 0) {
            return res.status(400).json({ err: 'Error adding dinner.' });
        }

        const newDinner = result.rows[0];
        return res.status(201).json(newDinner);
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
            consumedAt
        } = req.body;

        // validate data //
        if (isEmpty(name)) {
            return res.status(401).json({ err: 'Name is required.'});
        }
        else if (name.length > 50) {
            return res.status(401).json({ err: 'Name can only be up to 50 characters in length.'})
        }
        calories = (isEmpty(calories) ? null : parseInt(calories));
        totalFat = (isEmpty(totalFat) ? null : parseInt(totalFat));
        cholesterol = (isEmpty(cholesterol) ? null : parseInt(cholesterol));
        sodium = (isEmpty(sodium) ? null : parseInt(sodium));
        totalCarbohydrate = (isEmpty(totalCarbohydrate) ? null : parseInt(totalCarbohydrate));
        protein = (isEmpty(protein) ? null : parseInt(protein));
        if (isEmpty(consumedAt)) {
            return res.status(401).json({ err: 'Consumed at is required.' });
        }

        // insert data //
        let result = await db.query(
            `INSERT into snacks
             (user_id, name, calories, total_fat, cholesterol, sodium, total_carbohydrate, protein, consumed_at)
             VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING *;`,
            [req.user.id, name, calories, totalFat, cholesterol, sodium, totalCarbohydrate, protein, consumedAt]
        );
        if (result.rowCount === 0) {
            return res.status(400).json({ err: 'Error adding snack.' });
        }

        const newSnack = result.rows[0];
        return res.status(201).json(newSnack);
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