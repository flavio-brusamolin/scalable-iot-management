/* imports */
const jwt = require('jsonwebtoken');

/* generate jwt token with user id and user role */
const generateToken = (userId, userRole) => {
    const token = jwt.sign({ userId, userRole }, process.env.SECRET, {
        expiresIn: 43200
    });
    return token;
}

/* verify token authenticity */
const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ success: false, message: 'No token sent' });
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
        if (err) return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
        req.decodedToken = decodedToken;
        next();
    });
}

/* verify user permission by role */
const checkRole = (req, res, next) => {
    const userRole = req.decodedToken.userRole;
    if (userRole === 'user') return res.status(401).json({ success: false, message: 'Permission denied' });
    next();
}

/* exports */
module.exports = {
    generateToken,
    verifyToken,
    checkRole
}