const deviceDAO = require('../models/deviceDAO');

const mqttManagement = require('../mqtt/mqttManagement');

const createDevice = async (req, res) => {
    const device = req.body;
    try {
        if (device.topic) device.isConnected = await mqttManagement.verifyDeviceConnection(device.topic);
        await deviceDAO.createDevice(device);
        res.status(201).json({ success: true, message: 'Successfully registered device' });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
}

const listDevices = async (req, res) => {
    try {
        const devices = await deviceDAO.listDevices();
        res.status(200).json({ success: true, devices: devices });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
}

const changeDeviceState = async (req, res) => {
    const id = req.params.id;
    const action = req.query.action;
    if (action !== 'on' && action !== 'off')
        return res.status(400).json({ success: false, message: 'Impossible to perform chosen action' });
    try {
        const { topic, turnOn, turnOff } = await deviceDAO.getDeviceOptions(id);
        action === 'on' ?
            await mqttManagement.changeDeviceState(topic, turnOn) :
            await mqttManagement.changeDeviceState(topic, turnOff);
        res.status(200).json({ success: true, message: 'Successfully taken action' });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
}

const getDeviceData = async (req, res) => {
    const id = req.params.id;
    try {
        const { topic } = await deviceDAO.getDeviceOptions(id);
        const data = await mqttManagement.getDeviceData(topic);
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
}

module.exports = {
    createDevice,
    listDevices,
    changeDeviceState,
    getDeviceData
}