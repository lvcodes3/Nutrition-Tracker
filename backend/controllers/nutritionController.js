const db = require('../db');
const { isEmpty } = require('../utils/helper.js');

const addBreakfast = (async (req, res) => {
    try {
        let {
            name,
            calorie,
            fat,
            cholesterol,
            sodium,
            carbohydrate,
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
        calorie = (isEmpty(calorie) ? null : parseInt(calorie));
        fat = (isEmpty(fat) ? null : parseInt(fat));
        cholesterol = (isEmpty(cholesterol) ? null : parseInt(cholesterol));
        sodium = (isEmpty(sodium) ? null : parseInt(sodium));
        carbohydrate = (isEmpty(carbohydrate) ? null : parseInt(carbohydrate));
        protein = (isEmpty(protein) ? null : parseInt(protein));
        if (isEmpty(consumedAt)) {
            return res.status(401).json({ err: 'Consumed at is required.' });
        }

        // insert data //
        let result = await db.query(
            `INSERT into breakfast (userId, name, calorie, fat, cholesterol, sodium, carbohydrate, protein, consumedAt)
             VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING *, 'breakfast' AS mealType;`,
            [req.consumer.id, name, calorie, fat, cholesterol, sodium, carbohydrate, protein, consumedAt]
        );
        if (result.rowCount === 0) {
            return res.status(400).json({ err: 'Error adding breakfast.' });
        }

        // return data //
        return res.status(201).json(result.rows[0]);
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
            calorie,
            fat,
            cholesterol,
            sodium,
            carbohydrate,
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
        calorie = (isEmpty(calorie) ? null : parseInt(calorie));
        fat = (isEmpty(fat) ? null : parseInt(fat));
        cholesterol = (isEmpty(cholesterol) ? null : parseInt(cholesterol));
        sodium = (isEmpty(sodium) ? null : parseInt(sodium));
        carbohydrate = (isEmpty(carbohydrate) ? null : parseInt(carbohydrate));
        protein = (isEmpty(protein) ? null : parseInt(protein));
        if (isEmpty(consumedAt)) {
            return res.status(401).json({ err: 'Consumed at is required.' });
        }

        // insert data //
        let result = await db.query(
            `INSERT into lunch (userId, name, calorie, fat, cholesterol, sodium, carbohydrate, protein, consumedAt)
             VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING *, 'lunch' AS mealType;`,
            [req.consumer.id, name, calorie, fat, cholesterol, sodium, carbohydrate, protein, consumedAt]
        );
        if (result.rowCount === 0) {
            return res.status(400).json({ err: 'Error adding lunch.' });
        }

        // return data //
        return res.status(201).json(result.rows[0]);
    } 
    catch (err) {
        console.log(`Error adding lunch: ${err}`);
        return res.status(500).json({ err: 'Error adding lunch.' });
    }
});

const addDinner = (async (req, res) => {
    try {
        let {
            name,
            calorie,
            fat,
            cholesterol,
            sodium,
            carbohydrate,
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
        calorie = (isEmpty(calorie) ? null : parseInt(calorie));
        fat = (isEmpty(fat) ? null : parseInt(fat));
        cholesterol = (isEmpty(cholesterol) ? null : parseInt(cholesterol));
        sodium = (isEmpty(sodium) ? null : parseInt(sodium));
        carbohydrate = (isEmpty(carbohydrate) ? null : parseInt(carbohydrate));
        protein = (isEmpty(protein) ? null : parseInt(protein));
        if (isEmpty(consumedAt)) {
            return res.status(401).json({ err: 'Consumed at is required.' });
        }

        // insert data //
        let result = await db.query(
            `INSERT into dinner (userId, name, calorie, fat, cholesterol, sodium, carbohydrate, protein, consumedAt)
             VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING *, 'dinner' AS mealType;`,
            [req.consumer.id, name, calorie, fat, cholesterol, sodium, carbohydrate, protein, consumedAt]
        );
        if (result.rowCount === 0) {
            return res.status(400).json({ err: 'Error adding dinner.' });
        }

        // return data //
        return res.status(201).json(result.rows[0]);
    } 
    catch (err) {
        console.log(`Error adding dinner: ${err}`);
        return res.status(500).json({ err: 'Error adding dinner.' });
    }
});

const addSnack = (async (req, res) => {
    try {
        let {
            name,
            calorie,
            fat,
            cholesterol,
            sodium,
            carbohydrate,
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
        calorie = (isEmpty(calorie) ? null : parseInt(calorie));
        fat = (isEmpty(fat) ? null : parseInt(fat));
        cholesterol = (isEmpty(cholesterol) ? null : parseInt(cholesterol));
        sodium = (isEmpty(sodium) ? null : parseInt(sodium));
        carbohydrate = (isEmpty(carbohydrate) ? null : parseInt(carbohydrate));
        protein = (isEmpty(protein) ? null : parseInt(protein));
        if (isEmpty(consumedAt)) {
            return res.status(401).json({ err: 'Consumed at is required.' });
        }

        // insert data //
        let result = await db.query(
            `INSERT into snacks (userId, name, calorie, fat, cholesterol, sodium, carbohydrate, protein, consumedAt)
             VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING *, 'snack' AS mealType;`,
            [req.consumer.id, name, calorie, fat, cholesterol, sodium, carbohydrate, protein, consumedAt]
        );
        if (result.rowCount === 0) {
            return res.status(400).json({ err: 'Error adding snack.' });
        }

        // return data //
        return res.status(201).json(result.rows[0]);
    } 
    catch (err) {
        console.log(`Error adding snack: ${err}`);
        return res.status(500).json({ err: 'Error adding snack.' });
    }
});

const getDailyMeals = (async (req, res) => {
    try {
        let { date } = req.body;

        if (isEmpty(date)) {
            return res.status(400).json({ err: 'Date is empty.' });
        }

        // get current date's meals //
        let result = await db.query(
            `SELECT *, 'breakfast' AS mealType FROM breakfast WHERE userId=$1 AND DATE(consumedAt)=$2
             UNION ALL
             SELECT *, 'lunch' AS mealType FROM lunch WHERE userId=$1 AND DATE(consumedAt)=$2
             UNION ALL
             SELECT *, 'dinner' AS mealType FROM dinner WHERE userId=$1 AND DATE(consumedAt)=$2
             UNION ALL
             SELECT *, 'snack' AS mealType FROM snack WHERE userId=$1 AND DATE(consumedAt)=$2;`,
            [req.consumer.id, date]
        );
        if (result.rowCount === 0) {
            return res.status(400).json({ err: 'Error getting daily meals.' });
        }

        // return current date's meals //
        return res.status(200).json(result.rows);
    } 
    catch (err) {
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