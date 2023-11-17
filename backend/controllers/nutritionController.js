const db = require('../db');
const { isEmpty } = require('../utils/helper.js');

const addMeal = async (req, res) => {
    try {
        let {
            name,
            calorie,
            fat,
            cholesterol,
            sodium,
            carbohydrate,
            protein,
            consumedAt,
            mealType
        } = req.body;

        // validate data //
        if (isEmpty(name)) {
            return res.status(400).json({ err: 'Name is required.'});
        }
        else if (name.length > 50) {
            return res.status(400).json({ err: 'Name can only be up to 50 characters in length.'})
        }
        calorie = (isEmpty(calorie) ? null : parseInt(calorie));
        fat = (isEmpty(fat) ? null : parseInt(fat));
        cholesterol = (isEmpty(cholesterol) ? null : parseInt(cholesterol));
        sodium = (isEmpty(sodium) ? null : parseInt(sodium));
        carbohydrate = (isEmpty(carbohydrate) ? null : parseInt(carbohydrate));
        protein = (isEmpty(protein) ? null : parseInt(protein));
        if (isEmpty(consumedAt)) {
            return res.status(400).json({ err: 'Consumed at is required.' });
        }

        // insert data //
        let result = await db.query(
            `INSERT into ${mealType} ("consumerId", name, calorie, fat, cholesterol, sodium, carbohydrate, protein, "consumedAt")
             VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING *, ${mealType} AS "mealType";`,
            [req.consumer.id, name, calorie, fat, cholesterol, sodium, carbohydrate, protein, consumedAt]
        );
        if (result.rowCount === 0) {
            return res.status(500).json({ err: `Error adding ${mealType}.` });
        }

        // return data //
        return res.status(201).json(result.rows[0]);
    } 
    catch (err) {
        console.log(`Error adding ${mealType}: ${err}`);
        return res.status(500).json({ err: `Error adding ${mealType}.` });
    }
};

const updateMeal = async (req, res) => {
    try {
        let {
            id,
            name,
            calorie,
            fat,
            cholesterol,
            sodium,
            carbohydrate,
            protein,
            consumedAt,
            mealType
        } = req.body;

        // validate data //
        if (isEmpty(name)) {
            return res.status(400).json({ err: 'Name is required.'});
        }
        else if (name.length > 50) {
            return res.status(400).json({ err: 'Name can only be up to 50 characters in length.'})
        }
        calorie = (isEmpty(calorie) ? null : parseInt(calorie));
        fat = (isEmpty(fat) ? null : parseInt(fat));
        cholesterol = (isEmpty(cholesterol) ? null : parseInt(cholesterol));
        sodium = (isEmpty(sodium) ? null : parseInt(sodium));
        carbohydrate = (isEmpty(carbohydrate) ? null : parseInt(carbohydrate));
        protein = (isEmpty(protein) ? null : parseInt(protein));
        if (isEmpty(consumedAt)) {
            return res.status(400).json({ err: 'Consumed at is required.' });
        }

        // insert data //
        let result = await db.query(
            `UPDATE ${mealType}
             SET name=$1, calorie=$2, fat=$3, cholesterol=$4, sodium=$5, carbohydrate=$6, protein=$7, "consumedAt"=$8, "updatedAt"=CURRENT_TIMESTAMP
             WHERE id=$9 AND "consumerId"=$10
             RETURNING *, ${mealType} AS "mealType";`,
            [name, calorie, fat, cholesterol, sodium, carbohydrate, protein, consumedAt, id, req.consumer.id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ err: `Error adding ${mealType}.` });
        }

        // return data //
        return res.status(200).json(result.rows[0]);
    } 
    catch (err) {
        console.log(`Error adding ${mealType}: ${err}`);
        return res.status(500).json({ err: `Error adding ${mealType}.` });
    }
};

const deleteMeal = async (req, res) => {
    try {
        let { id, mealType } = req.body;

        let result = await db.query(
            `DELETE FROM ${mealType}
             WHERE id=$1 AND "consumerId"=$2;`,
            [id, req.consumer.id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ err: `${mealType} not found.` });
        }

        return res.status(204).send();
    }
    catch (err) {
        console.log(`Error deleting ${mealType}: ${err}`);
        return res.status(500).json({ err: `Error deleting ${mealType}.` });
    }
};

const getDailyMeals = async (req, res) => {
    try {
        let { date } = req.body;

        if (isEmpty(date)) {
            return res.status(400).json({ err: 'Date is empty.' });
        }

        // get current date's meals //
        let result = await db.query(
            `SELECT *, 'breakfast' AS "mealType" FROM breakfast WHERE "consumerId"=$1 AND DATE("consumedAt")=$2
             UNION ALL
             SELECT *, 'lunch' AS "mealType" FROM lunch WHERE "consumerId"=$1 AND DATE("consumedAt")=$2
             UNION ALL
             SELECT *, 'dinner' AS "mealType" FROM dinner WHERE "consumerId"=$1 AND DATE("consumedAt")=$2
             UNION ALL
             SELECT *, 'snack' AS "mealType" FROM snack WHERE "consumerId"=$1 AND DATE("consumedAt")=$2;`,
            [req.consumer.id, date]
        );
        return res.status(200).json(result.rows);
    } 
    catch (err) {
        console.log(`Error getting daily meals: ${err}`);
        return res.status(500).json({ err: 'Error getting daily meals.' });
    }
};

module.exports = {
    addMeal,
    updateMeal,
    deleteMeal,
    getDailyMeals
};