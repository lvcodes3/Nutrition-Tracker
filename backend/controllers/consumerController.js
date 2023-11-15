const db = require('../db');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/generateJWT.js');
const { isEmpty } = require('../utils/helper.js');

const registerConsumer = (async (req, res) => {
    try {
        const { firstName, email, password } = req.body;

        // validate input data //
        let errMessage = '';
        if (isEmpty(firstName) || firstName.length > 25) {
            errMessage += 'First name is required and can only be up to 25 characters in length.';
        }
        if (isEmpty(email) || email.length > 50) {
            errMessage += 'Email is required and can only be up to 50 characters in length.';
        }
        if (isEmpty(password) || password.length < 5 || password.length > 20) {
            errMessage += 'Password is required and must be between 5 and 20 characters in length.';
        }
        if (errMessage !== '') {
            return res.status(401).json({ err: errMessage });
        }

        // ensure email is unique //
        let result = await db.query(
            `SELECT email FROM consumer
             WHERE email=$1;`,
            [email]
        );
        if (result.rowCount > 0) {
            errMessage += 'Email already exists.';
            return res.status(401).json({ err: errMessage })
        }

        // hash password w/ bcrypt //
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        // register user //
        result = await db.query(
            `INSERT INTO consumer (firstName, email, password)
             VALUES ($1, $2, $3)
             RETURNING id;`,
            [firstName, email, hashedPassword]
        );
        if (result.rowCount === 0) {
            return res.status(400).json({ err: 'Error registering consumer.' });
        }

        return res.status(201).json({ msg: 'Registration successful.' });
    } 
    catch (err) {
        console.log(`Registration error: ${err}`);
        return res.status(500).json({ err: 'Registration error.'});
    }
});

const loginConsumer = (async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if email exists //
        let result = await db.query(
            `SELECT id, password FROM consumer
             WHERE email=$1;`,
            [email]
        );
        if (result.rowCount === 0) {
            return res.status(401).json({ err: 'Invalid email or password.' });
        }

        // check if password is correct //
        let consumer = result.rows[0];
        const isValidPassword = await bcrypt.compare(password, consumer.password);
        if (!isValidPassword) {
            return res.status(401).json({ err: 'Invalid email or password.' });
        }

        // update consumer //
        result = await db.query(
            `UPDATE consumer
             SET updatedAt=CURRENT_TIMESTAMP, lastSignedIn=CURRENT_TIMESTAMP
             WHERE id=$1
             RETURNING id, firstName, email, createdAt, updatedAt, lastSignedIn;`,
            [consumer.id]
        );
        if (result.rowCount === 0) {
            res.status(400).json({ err: 'Error logging in consumer.' });
        }

        // generate JWT & return consumer data //
        consumer = result.rows[0];
        generateJWT(res, consumer.id);
        res.status(200).json(consumer);
    } 
    catch (err) {
        console.log(`Login error: ${err}`);
        return res.status(500).json({ err: 'Login error.' });
    }
});

const logoutConsumer = (req, res) => {
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        });
        res.status(200).json({ msg: 'Logout successful.' });
    } 
    catch (err) {
        console.log(`Logout error: ${err}`);
        return res.status(500).json({ err: 'Logout error.' });
    }
};

const authConsumer = (async (req, res) => {
    return res.status(200).json(req.user);
});

module.exports = {
    registerConsumer,
    loginConsumer,
    logoutConsumer,
    authConsumer
};