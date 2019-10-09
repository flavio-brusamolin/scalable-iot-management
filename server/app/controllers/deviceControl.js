const deviceDAO = require('../models/deviceDAO');

const mqttManagement = require('../mqtt/mqttManagement');

/* create new device */
const createDevice = async (req, res) => {
    const device = req.body;
    try {
        if (device.publishingTopic) device.isConnected = await mqttManagement.verifyDeviceConnection(device.publishingTopic);
        await deviceDAO.createDevice(device);
        res.status(201).json({ success: true, message: 'Successfully registered device' });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
}

/* list devices */
const listDevices = async (req, res) => {
    try {
        const devices = await deviceDAO.listDevices();
        res.status(200).json({ success: true, devices: devices });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
}

/* turn on/off device */
const changeDeviceState = async (req, res) => {
    const id = req.params.id;
    const action = req.query.action;
    if (action !== 'on' && action !== 'off')
        return res.status(400).json({ success: false, message: 'Impossible to perform chosen action' });
    try {
        const { subscriptionTopic, turnOn, turnOff } = await deviceDAO.getDeviceOptions(id);
        action === 'on' ?
            await mqttManagement.changeDeviceState(subscriptionTopic, turnOn) :
            await mqttManagement.changeDeviceState(subscriptionTopic, turnOff);
        res.status(200).json({ success: true, message: 'Successfully completed action' });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
}

/* fetch device data */
const getDeviceData = async (req, res) => {
    const id = req.params.id;
    try {
        const { publishingTopic } = await deviceDAO.getDeviceOptions(id);
        const data = await mqttManagement.getDeviceData(publishingTopic);
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
}

/* exports */
module.exports = {
    createDevice,
    listDevices,
    changeDeviceState,
    getDeviceData
}