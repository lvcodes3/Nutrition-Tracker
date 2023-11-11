const jwt = require('jsonwebtoken');

const generateJWT = (res, id) => {
    // create the jwt //
    const jsonWebToken = jwt.sign({ id }, process.env.JWTSECRET, {
        expiresIn: '1d'
    });

    // create cookie containing the jwt //
    res.cookie('jwt', jsonWebToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // secure will be false in dev mode, otherwise true
        sameSite: 'strict', // prevents CSRF attacks
        maxAge: 24 * 60 * 60 * 1000 // 1 day 
    });
};

module.exports = generateJWT;