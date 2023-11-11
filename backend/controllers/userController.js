const db = require('../db');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/generateJWT.js');
const { isEmpty } = require('../utils/helper.js');

const registerUser = (async (req, res) => {
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
            `SELECT email FROM users 
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
            `INSERT INTO users (first_name, email, password)
             VALUES ($1, $2, $3)
             RETURNING id;`,
            [firstName, email, hashedPassword]
        );
        if (result.rowCount === 0) {
            return res.status(400).json({ err: 'Error registering user.' });
        }

        return res.status(201).json({ msg: 'Registration successful.' });
    } 
    catch (err) {
        console.log(`Registration error: ${err}`);
        return res.status(500).json({ err: 'Registration error.'});
    }
});

const loginUser = (async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if email exists //
        let result = await db.query(
            `SELECT id, password FROM users
             WHERE email=$1;`,
            [email]
        );
        if (result.rowCount === 0) {
            return res.status(401).json({ err: 'Invalid email or password.' });
        }

        // check if password is correct //
        let user = result.rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ err: 'Invalid email or password.' });
        }

        // update user //
        result = await db.query(
            `UPDATE users
             SET updated_at=CURRENT_TIMESTAMP, last_signed_in=CURRENT_TIMESTAMP
             WHERE id=$1
             RETURNING id, first_name, email, created_at, updated_at, last_signed_in;`,
            [user.id]
        );
        if (result.rowCount === 0) {
            res.status(400).json({ err: 'Error logging in user.' });
        }

        // generate JWT & return user data //
        user = result.rows[0];
        generateJWT(res, user.id);
        res.status(200).json(user);
    } catch (err) {
        console.log(`Login error: ${err}`);
        return res.status(500).json({ err: 'Login error.' });
    }
});

const logoutUser = (req, res) => {
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        });
        res.status(200).json({ msg: 'Logout successful.' });
    } catch (err) {
        console.log(`Logout error: ${err}`);
        return res.status(500).json({ err: 'Logout error.' });
    }
};

const authUser = (async (req, res) => {
    return res.status(200).json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    authUser
};