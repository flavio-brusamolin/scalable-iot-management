/* imports */
const userControl = require('../controllers/userControl');

const auth = require('../middlewares/auth');

/* user routes */
module.exports = app => {
    app.post('/user', auth.verifyToken, auth.checkRole, userControl.createUser);
    app.get('/user', auth.verifyToken, auth.checkRole, userControl.listUsers);
    app.put('/user/:id', auth.verifyToken, auth.checkRole, userControl.updateUser);
    app.delete('/user/:id', auth.verifyToken, auth.checkRole, userControl.removeUser);
    app.post('/user/auth', userControl.authenticateUser);
}
