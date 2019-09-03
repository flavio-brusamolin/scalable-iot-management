require('dotenv-safe').config();

const jwt = require('jsonwebtoken');

const generateToken = (userId, userRole) => {
    const token = jwt.sign({ userId, userRole }, process.env.SECRET, {
        expiresIn: 43200
    });
    return token;
}

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ success: false, message: 'Nenhum token enviado' });
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
        if (err) return res.status(401).json({ success: false, message: 'Falha ao autenticar token' });
        req.decodedToken = decodedToken;
        next();
    });
}

const checkRole = (req, res, next) => {
    const userRole = req.decodedToken.userRole;
    if (userRole === 'user') return res.status(401).json({ success: false, message: 'Permissão negada' });
    next();
}

module.exports = {
    generateToken,
    verifyToken,
    checkRole
}