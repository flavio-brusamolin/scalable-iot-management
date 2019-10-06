const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

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
        required: true
    },
    topic: {
        type: String,
        required: [true, 'Device topic required'],
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

deviceSchema.plugin(uniqueValidator, { message: "Two devices cannot have the same field '{PATH}'" });

const Device = mongoose.model('devices', deviceSchema);

module.exports = Device; 