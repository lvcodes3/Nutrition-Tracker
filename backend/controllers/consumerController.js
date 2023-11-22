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
        console.log(`Registration ${err}`);
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
        console.log(`Login ${err}`);
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
        console.log(`Logout ${err}`);
        return res.status(500).json({ err: 'Logout error.' });
    }
};

const authConsumer = async (req, res) => {
    return res.status(200).json(req.consumer);
};

const searchByFirstName = async (req, res) => {
    try {
        const { firstName } = req.body;
        let altFirstName = null;

        // first char in firstName is alphabetical //
        if (!(/[^a-zA-Z]/.test(firstName[0]))) {
            // first char in firstName is uppercase //
            if (firstName[0] === firstName[0].toUpperCase()) {
                altFirstName = firstName[0].toLowerCase() + firstName.slice(1);
            }
            // first char in firstName is lowercase //
            else {
                altFirstName = firstName[0].toUpperCase() + firstName.slice(1);
            }
        }

        let result = null;
        if (altFirstName) {
            result = await db.query(
                `SELECT consumer.id, consumer."firstName", COALESCE(cfr.status, 'null') AS "relationshipStatus"
                 FROM consumer
                 LEFT JOIN "consumerFriendRelationship" cfr
                    ON (cfr."senderId" = consumer.id AND cfr."receiverId" = $3)
                    OR (cfr."receiverId" = consumer.id AND cfr."senderId" = $3)
                 WHERE (consumer."firstName" = $1 OR consumer."firstName" = $2)
                    AND consumer.id != $3;`,
                [firstName, altFirstName, req.consumer.id]
            );
        }
        else {
            result = await db.query(
                `SELECT consumer.id, consumer."firstName", COALESCE(cfr.status, 'null') AS "relationshipStatus"
                 FROM consumer
                 LEFT JOIN "consumerFriendRelationship" cfr
                    ON (cfr."senderId" = consumer.id AND cfr."receiverId" = $2)
                    OR (cfr."receiverId" = consumer.id AND cfr."senderId" = $2)
                 WHERE (consumer."firstName" = $1)
                    AND consumer.id != $2;`,
                [firstName, req.consumer.id]
            );
        }

        if (result.rowCount === 0) {
            return res.status(400).json({ err: `No search results for ${firstName}.` });
        }
        return res.status(200).json(result.rows);
    } 
    catch (err) {
        console.log(`Search by first name ${err}`);
        return res.status(500).json({ err: 'Search by first name error.' });
    }
};

const sendFriendRequest = async (req, res) => {
    try {
        const { receiverId } = req.body;
        // use req.consumer.id as the senderID //

        // first check to see if relation already exists //
        let result = await db.query(
            `SELECT id, "senderId", "receiverId", status
             FROM "consumerFriendRelationship"
             WHERE ("senderId" = $1 AND "receiverId" = $2) OR ("senderId" = $2 AND "receiverId" = $1);`,
            [req.consumer.id, receiverId]
        );

        // relation does not exist //
        if (result.rowCount === 0) {
            result = await db.query(
                `INSERT INTO "consumerFriendRelationship" ("senderId", "receiverId", status)
                 VALUES ($1, $2, 'pending')
                 RETURNING id, "senderId", "receiverId", status;`,
                [req.consumer.id, receiverId]
            );
            if (result.rowCount === 0) {
                return res.status(400).json({ err: 'Error sending friend request.' });
            }
            return res.status(201).json(result.rows[0]);
        }
        // relation exists //
        else {
            let relation = result.rows[0];

            if (relation.status === 'accepted') {
                return res.status(401).json({ err: 'Unable to send a friend request to someone you are already friends with.' });
            }
            else if (relation.status === 'rejected') {
                return res.status(401).json({ err: 'Unable to send a friend request to someone who rejected your previous friend request.' });
            }
            else if (relation.senderId === req.consumer.id && relation.status === 'pending') {
                return res.status(400).json({ err: 'Unable to send another friend request.' });
            }
            else if (relation.status === 'pending') {
                result = await db.query(
                    `UPDATE "consumerFriendRelationship"
                     SET status = 'accepted', "updatedAt" = CURRENT_TIMESTAMP
                     WHERE id=$1
                     RETURNING id, "senderId", "receiverId", status;`,
                    [relation.id]
                );
                if (result.rowCount === 0) {
                    return res.status(400).json({ err: 'Error sending friend request.' });
                }
                return res.status(200).json(result.rows[0]);
            }
        }
    } 
    catch (err) {
        console.log(`Send friend request ${err}`);
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
        console.log(`Get friend requests ${err}`);
        return res.status(500).json({ err: 'Error getting friend requests.' });    
    }
};

const acceptFriendRequest = async (req, res) => {
    try {
        const { id, senderId, receiverId } = req.body;


    } 
    catch (err) {
        console.log(`Accept friend request ${err}`);
        return res.status(500).json({ err: 'Error accepting friend request.' });
    }
};

const declineFriendRequest = async (req, res) => {
    try {
        const { id, senderId, receiverId } = req.body;
    } 
    catch (err) {
        console.log(`Decline friend request ${err}`);
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