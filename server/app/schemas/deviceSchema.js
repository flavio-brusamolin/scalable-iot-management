const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    isConnected: {
        type: Boolean,
        required: true
    },
    topic: {
        type: String,
        required: true,
        unique: true
    },
    turnOn: {
        type: String,
        required: true
    },
    turnOff: {
        type: String,
        required: true
    },
    data: [String]
});

deviceSchema.plugin(uniqueValidator, { message: 'Dispositivo já existente' });

const Device = mongoose.model('devices', deviceSchema);

module.exports = Device; 