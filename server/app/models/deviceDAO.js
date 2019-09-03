const Device = require('../schemas/deviceSchema');

const createDevice = device => {
    return new Promise((resolve, reject) => {
        new Device(device).save()
            .then(() => resolve())
            .catch(err => reject(err.message))
    });
}

const listDevices = () => {
    return new Promise((resolve, reject) => {
        Device.find().select('-topic -turnOn -turnOff -data')
            .then(devices => resolve(devices))
            .catch(err => reject(err.message))
    });
}

const getDeviceOptions = id => {
    return new Promise((resolve, reject) => {
        Device.findById(id).select('-name -type')
            .then(options => {
                if (!options) reject('Dispositivo não encontrado');
                else if (!options.isConnected) reject('Dispositivo desconectado');
                else resolve(options);
            })
            .catch(err => reject(err.message))
    });
}

const listAllTopics = () => {
    return new Promise((resolve, reject) => {
        Device.find().select('-name -type -isConnected -turnOn -turnOff -data')
            .then(topics => resolve(topics))
            .catch(err => reject(err))
    });
}

const updateDeviceConnection = (id, status) => {
    return new Promise((resolve, reject) => {
        Device.findByIdAndUpdate(id, { isConnected: status })
            .then(() => resolve())
            .catch(err => reject(err))
    });
}

module.exports = {
    createDevice,
    listDevices,
    getDeviceOptions,
    listAllTopics,
    updateDeviceConnection
}