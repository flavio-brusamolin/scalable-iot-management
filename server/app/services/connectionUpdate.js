/* imports */
const { listAllPublishingTopics, updateDeviceConnection } = require('../models/deviceDAO');

const { verifyDeviceConnection } = require('../mqtt/mqttManagement');

/* verify and update devices connection */
const verifyDevicesConnection = async () => {
    while (true) {
        try {
            const elements = await listAllPublishingTopics();
            const promises = elements.map(async element => {
                const status = await verifyDeviceConnection(element.publishingTopic);
                await updateDeviceConnection(element._id, status);
            });
            await Promise.all(promises);
        } catch (error) {
            console.log(error);
        }
    }
}

verifyDevicesConnection();