const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user']
    }
});

userSchema.plugin(uniqueValidator, { message: 'Nome de usuário já existente' });

const User = mongoose.model('users', userSchema);

module.exports = User; 