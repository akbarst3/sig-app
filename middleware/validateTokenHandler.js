const jwt = require('jsonwebtoken');

function validateTokenHandler(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401)
        throw new Error('Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401)
        throw new Error('Access denied. No token provided.');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                res.status(401)
                throw new Error('Token Expired');
            } else {
                res.status(403)
                throw new Error('Invalid Access Token');
            }
        }
        req.user = user;
        next();
    });
}

module.exports = validateTokenHandler;