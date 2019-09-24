const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Nome obrigatório']
    },
    user: {
        type: String,
        required: [true, 'Login de acesso obrigatório'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Senha obrigatória']
    },
    role: {
        type: String,
        required: [true, 'Perfil obrigatório'],
        enum: {
            values: ['admin', 'user'],
            message: "Perfil do usuário deve ser 'admin' ou 'user'"
        }
    }
});

userSchema.plugin(uniqueValidator, { message: 'Nome de usuário já existente' });

const User = mongoose.model('users', userSchema);

module.exports = User; 