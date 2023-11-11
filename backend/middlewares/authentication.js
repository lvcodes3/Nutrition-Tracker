const db = require('../db');
const jwt = require('jsonwebtoken');

const protect = (async (req, res, next) => {
    // get the jwt from the cookies //
    const jsonWebToken = req.cookies.jwt;

    // check if the jwt exists //
    if (jsonWebToken) {
        try {
            // verify the jwt //
            const decoded = jwt.verify(jsonWebToken, process.env.JWTSECRET);

            // get the user //
            let result = await db.query(
                `SELECT id, first_name, email, created_at, updated_at, last_signed_in
                 FROM users
                 WHERE id=$1;`,
                [decoded.id]
            );
            if (result.rowCount === 0) {
                return res.status(400).json({ err: 'User does not exist.' });
            }

            // create req.user to send to the next route //
            req.user = result.rows[0];

            // go to next route //
            next();   
        } catch (err) {
            return res.status(401).json({ err: 'Not authorized, invalid JWT.' });          
        }
    } else {
        return res.status(401).json({ err: 'Not authorized, no JWT.' });
    }
});

module.exports = protect;