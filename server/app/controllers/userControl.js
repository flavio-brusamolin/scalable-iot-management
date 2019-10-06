const userDAO = require('../models/userDAO');

const crypto = require('../utils/crypto');

const auth = require('../middlewares/auth');

const createUser = async (req, res) => {
    const user = req.body;
    if (user.password) user.password = crypto.encrypt(user.password);
    try {
        await userDAO.createUser(user);
        res.status(201).json({ success: true, message: 'Successfully registered user' });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
}

const listUsers = async (req, res) => {
    try {
        const users = await userDAO.listUsers();
        res.status(200).json({ success: true, users: users });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const newUser = req.body;
    if (newUser.password) newUser.password = crypto.encrypt(newUser.password);
    try {
        await userDAO.updateUser(id, newUser);
        res.status(200).json({ success: true, message: 'Successfully updated user' });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
}

const removeUser = async (req, res) => {
    const id = req.params.id;
    try {
        await userDAO.removeUser(id);
        res.status(200).json({ success: true, message: 'Successfully removed user' });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
}

const authenticateUser = async (req, res) => {
    const { user, password } = req.body;
    const encryptedPassword = password ? crypto.encrypt(password) : password;
    try {
        const authUser = await userDAO.authenticateUser(user, encryptedPassword);
        const token = auth.generateToken(authUser._id, authUser.role);
        res.status(200).json({ success: true, username: authUser.name, token: token });
    } catch (error) {
        res.status(401).json({ success: false, message: error });
    }
}

module.exports = {
    createUser,
    listUsers,
    updateUser,
    removeUser,
    authenticateUser
}