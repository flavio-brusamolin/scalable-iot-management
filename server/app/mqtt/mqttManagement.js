const mqtt = require('async-mqtt');

const options = {
    port: 16838,
    clientId: 'krpgdhec' + Math.random().toString(16).substr(2, 8),
    username: 'krpgdhec',
    password: '1Us4LQZgRFWl'
}

const client = mqtt.connect('mqtt://soldier.cloudmqtt.com', options);
client.setMaxListeners(10000);

const verifyDeviceConnection = topic => {
    return new Promise((resolve, reject) => {
        client.subscribe(topic, err => reject(err));
        client.on('message', receivedTopic => {
            if (receivedTopic === topic)
                resolve(true);
        });
        setTimeout(() => resolve(false), 3000);
    });
}

const changeDeviceState = (topic, action) => {
    return new Promise(async (resolve, reject) => {
        try {
            await client.publish(topic, action);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

const getDeviceData = topic => {
    return new Promise((resolve, reject) => {
        client.subscribe(topic, err => reject(err));
        client.on('message', (topic, message) => resolve(JSON.parse(message)));
        setTimeout(() => reject('Não foi possivel buscar as informações do dispositivo'), 3000);
    });
}

module.exports = {
    verifyDeviceConnection,
    changeDeviceState,
    getDeviceData
}