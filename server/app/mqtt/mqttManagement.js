/* imports */
const mqtt = require('async-mqtt');

/* MQTT broker options */
const options = {
    port: 16838,
    username: 'krpgdhec',
    password: '1Us4LQZgRFWl'
}

/* MQTT broker connection */
const client = mqtt.connect('mqtt://soldier.cloudmqtt.com', options);
client.setMaxListeners(100000);

/* verify device connection through messages in topic */
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

/* send message on topic to turn on/off device */
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

/* fetch device data on topic */
const getDeviceData = topic => {
    return new Promise((resolve, reject) => {
        client.subscribe(topic, err => reject(err));
        client.on('message', (receivedTopic, message) => {
            if (receivedTopic === topic) {
                if (isJSON(message))
                    resolve(JSON.parse(message));
                else
                    resolve({});
            }
        });
        setTimeout(() => reject('Unable to fetch device data'), 3000);
    });

    function isJSON(string) {
        try {
            JSON.parse(string)
        } catch (error) {
            return false;
        }
        return true;
    }
}

/* exports */
module.exports = {
    verifyDeviceConnection,
    changeDeviceState,
    getDeviceData
}