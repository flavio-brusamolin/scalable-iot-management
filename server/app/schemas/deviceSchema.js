/* imports */
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

/* create device schema */
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Device name required'],
        unique: true
    },
    type: {
        type: String,
        required: [true, 'Device type required']
    },
    isConnected: {
        type: Boolean,
        required: [true, 'Device connection status is required']
    },
    subscriptionTopic: {
        type: String,
        required: [true, 'Device subscription topic required'],
        unique: true
    },
    publishingTopic: {
        type: String,
        required: [true, 'Device publishing topic required'],
        unique: true
    },
    turnOn: {
        type: String,
        required: [true, 'Trigger format required']
    },
    turnOff: {
        type: String,
        required: [true, 'Shutdown format required']
    }
});

/* add unique validator plugin to device schema */
deviceSchema.plugin(uniqueValidator, { message: "Two devices cannot have the same field '{PATH}'" });

/* save device schema on object Device */
const Device = mongoose.model('devices', deviceSchema);

/* exports */
module.exports = Device; 