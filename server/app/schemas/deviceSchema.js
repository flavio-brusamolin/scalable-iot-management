const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Nome do dispositivo obrigatório'],
        unique: true
    },
    type: {
        type: String,
        required: [true, 'Tipo do dispositivo obrigatório']
    },
    isConnected: {
        type: Boolean,
        required: true
    },
    topic: {
        type: String,
        required: [true, 'Tópico do dispositivo obrigatório'],
        unique: true
    },
    turnOn: {
        type: String,
        required: [true, 'Forma de acionamento obrigatória']
    },
    turnOff: {
        type: String,
        required: [true, 'Forma de desligamento obrigatória']
    }
});

deviceSchema.plugin(uniqueValidator, { message: 'Dispositivo já existente' });

const Device = mongoose.model('devices', deviceSchema);

module.exports = Device; 