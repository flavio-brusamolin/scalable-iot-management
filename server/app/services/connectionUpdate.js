/* imports */
const { listAllTopics, updateDeviceConnection } = require('../models/deviceDAO');

const { verifyDeviceConnection } = require('../mqtt/mqttManagement');

/* verify and update devices connection */
const verifyDevicesConnection = async () => {
    while (true) {
        try {
            const elements = await listAllTopics();
            const promises = elements.map(async element => {
                const status = await verifyDeviceConnection(element.topic);
                await updateDeviceConnection(element._id, status);
            });
            await Promise.all(promises);
        } catch (error) {
            console.log(error);
        }
    }
}

/* exports */
verifyDevicesConnection();