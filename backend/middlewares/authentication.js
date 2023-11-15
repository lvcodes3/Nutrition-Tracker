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

            // get the consumer //
            let result = await db.query(
                `SELECT id, "firstName", email, "createdAt", "updatedAt", "lastSignedIn" FROM consumer
                 WHERE id=$1;`,
                [decoded.id]
            );
            if (result.rowCount === 0) {
                return res.status(400).json({ err: 'Consumer does not exist.' });
            }

            // create req.consumer to send to the next route //
            req.consumer = result.rows[0];

            // go to next route //
            next();   
        } 
        catch (err) {
            return res.status(401).json({ err: 'Not authorized, invalid JWT.' });          
        }
    } 
    else {
        return res.status(401).json({ err: 'Not authorized, no JWT.' });
    }
});

module.exports = protect;