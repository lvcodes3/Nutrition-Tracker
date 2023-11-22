const db = require('../db');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/generateJWT.js');
const { isEmpty } = require('../utils/helper.js');

const registerConsumer = async (req, res) => {
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

        // register consumer //
        result = await db.query(
            `INSERT INTO consumer ("firstName", email, password)
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
};

const loginConsumer = async (req, res) => {
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
             SET "updatedAt"=CURRENT_TIMESTAMP, "lastSignedIn"=CURRENT_TIMESTAMP
             WHERE id=$1
             RETURNING id, "firstName", email, "createdAt", "updatedAt", "lastSignedIn";`,
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
};

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

const authConsumer = async (req, res) => {
    return res.status(200).json(req.consumer);
};

const searchByFirstName = async (req, res) => {
    try {
        const { firstName } = req.body;
        let altFirstName = '';

        // if first character is uppercase //
        if (firstName[0] === firstName[0].toUpperCase()) {

        }

        if (/^[A-Z]/.test(firstName)) {
            altFirstName = firstName.charAt(0).toLowerCase() + firstName.slice(1);
        } 
        else {
            altFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        }

        let result = await db.query(
            `SELECT id, "firstName" 
             FROM consumer
             WHERE ("firstName"=$1 OR "firstName"=$2 OR "firstName" LIKE '%' || $1 || '%' OR "firstName" LIKE '%' || $2 || '%')
                AND id!=$3
                AND NOT EXISTS (
                    SELECT 1
                    FROM "consumerFriendRelationship"
                    WHERE ("senderId" = consumer.id AND "receiverId"=$3)
                        OR ("receiverId" = consumer.id AND "senderId"=$3)
                        AND status='accepted'
                );`,
            [firstName, altFirstName, req.consumer.id]
        );
        if (result.rowCount === 0) {
            return res.status(400).json({ err: `No search results for ${firstName}.` });
        }
        else {
            return res.status(200).json(result.rows);
        }
    } 
    catch (err) {
        console.log(`Search by first name error: ${err}`);
        return res.status(500).json({ err: 'Search by first name error.' });
    }
};

const sendFriendRequest = async () => {
    try {
        const { senderId, receiverId } = req.body;

        // first check to see if relation already exists //
        let result = await db.query(
            `SELECT id, "senderId", "receiverId", status
             FROM "consumerFriendRelationship"
             WHERE "senderId" = $1 OR "receiverId" = $2 OR "senderId" = $2 OR "receiverId" = $1;`,
            [senderId, receiverId]
        );

        if (result.rowCount === 0) {
            let res = await db.query(
                `INSERT INTO "consumerFriendRelationship" ("senderId", "receiverId", status)
                 VALUES ($1, $2, 'pending')
                 RETURNING id, "senderId", "receiverId", status;`,
                [senderId, receiverId]
            );
            if (res.rowCount === 0) {
                return res.status(400).json({ err: 'Error sending friend request.' });
            }
            return res.status(201).json(res.rows[0]);
        }
        else {
            let relation = result.rows[0];

            if (relation.status === 'pending') {
                let res = await db.query(
                    `UPDATE "consumerFriendRelationship"
                     SET status = 'accepted', "updatedAt" = CURRENT_TIMESTAMP
                     WHERE id=$1;`,
                    [relation.id]
                );
                
            }
            else if (relation.status === 'accepted') {
                return res.status(401).json({ err: 'Unable to send a friend request to someone you are already friends with.' });
            }
            else if (relation.status === 'rejected') {
                return res.status(401).json({ err: 'Unable to send a friend request to someone who rejected your previous friend request.' });
            }
        }

    } 
    catch (err) {
        console.log(`Error sending friend request: ${err}`);
        return res.status(500).json({ err: 'Error sending friend request.' });
    }
};

const getFriendRequests = async (req, res) => {
    try {
        let result = await db.query(
            `SELECT id, "senderId", "receiverId", "status"
             FROM "consumerFriendRelationship"
             WHERE "receiverId" = $1 AND status = 'pending';`,
            [req.consumer.id]
        );
        return res.status(200).json(result.rows);
    }
    catch (err) {
        console.log(`Error getting friend requests: ${err}`);
        return res.status(500).json({ err: 'Error getting friend requests.' });    
    }
};

const acceptFriendRequest = async (req, res) => {
    try {
        const { id, senderId, receiverId } = req.body;


    } 
    catch (err) {
        console.log(`Error accepting friend request: ${err}`);
        return res.status(500).json({ err: 'Error accepting friend request.' });
    }
};

const declineFriendRequest = async (req, res) => {
    try {
        const { id, senderId, receiverId } = req.body;
    } 
    catch (err) {
        console.log(`Error declining friend request: ${err}`);
        return res.status(500).json({ err: 'Error declining friend request.' });
    }
};

module.exports = {
    registerConsumer,
    loginConsumer,
    logoutConsumer,
    authConsumer,
    searchByFirstName,
    sendFriendRequest,
    getFriendRequests,
    acceptFriendRequest,
    declineFriendRequest
};