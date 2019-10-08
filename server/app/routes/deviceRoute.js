/* imports */
const deviceControl = require('../controllers/deviceControl');

const auth = require('../middlewares/auth');

/* device routes */
module.exports = app => {
    app.post('/device', deviceControl.createDevice);
    app.get('/device', auth.verifyToken, deviceControl.listDevices);
    app.post('/device/:id', auth.verifyToken, deviceControl.changeDeviceState);
    app.get('/device/:id', auth.verifyToken, deviceControl.getDeviceData);
}
