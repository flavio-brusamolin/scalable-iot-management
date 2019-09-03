const deviceDAO = require('../models/deviceDAO');

const mqttManagament = require('../mqtt/mqttManagement');

const createDevice = async (req, res) => {
    const device = req.body;
    try {
        device.isConnected = await mqttManagament.verifyDeviceConnection(device.topic);
        await deviceDAO.createDevice(device);
        res.status(201).json({ success: true, message: 'Dispositivo cadastrado com sucesso' });
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
        return res.status(400).json({ success: false, message: 'Impossível realizar a ação desejada' });
    try {
        const { topic, turnOn, turnOff } = await deviceDAO.getDeviceOptions(id);
        action === 'on' ?
            await mqttManagament.changeDeviceState(topic, turnOn) :
            await mqttManagament.changeDeviceState(topic, turnOff);
        res.status(200).json({ success: true, message: 'Ação realizada com sucesso' });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
}

const getDeviceData = async (req, res) => {
    const id = req.params.id;
    try {
        const { topic } = await deviceDAO.getDeviceOptions(id);
        const data = await mqttManagament.getDeviceData(topic);
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