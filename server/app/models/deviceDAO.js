/* imports */
const Device = require('../schemas/deviceSchema');

const handleError = require('../utils/handleError');

/* create new device */
const createDevice = device => {
    return new Promise((resolve, reject) => {
        new Device(device).save()
            .then(() => resolve())
            .catch(err => reject(handleError(err.message)))
    });
}

/* list devices */
const listDevices = () => {
    return new Promise((resolve, reject) => {
        Device.find().select('-subscriptionTopic -publishingTopic -turnOn -turnOff -data')
            .then(devices => resolve(devices))
            .catch(err => reject(handleError(err.message)))
    });
}

/* get device options by id */
const getDeviceOptions = id => {
    return new Promise((resolve, reject) => {
        Device.findById(id).select('-name -type')
            .then(options => {
                if (!options) reject('Device not found');
                else if (!options.isConnected) reject('This device is offline');
                else resolve(options);
            })
            .catch(err => reject(handleError(err.message)))
    });
}

/* list publishing topics of all devices */
const listAllPublishingTopics = () => {
    return new Promise((resolve, reject) => {
        Device.find().select('-name -type -isConnected -turnOn -turnOff -data -subscriptionTopic')
            .then(topics => resolve(topics))
            .catch(err => reject(handleError(err.message)))
    });
}

/* update device connection status */
const updateDeviceConnection = (id, status) => {
    return new Promise((resolve, reject) => {
        Device.findByIdAndUpdate(id, { isConnected: status })
            .then(() => resolve())
            .catch(err => reject(handleError(err.message)))
    });
}

/* exports */
module.exports = {
    createDevice,
    listDevices,
    getDeviceOptions,
    listAllPublishingTopics,
    updateDeviceConnection
}