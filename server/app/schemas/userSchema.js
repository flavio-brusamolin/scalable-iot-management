const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User name required']
    },
    user: {
        type: String,
        required: [true, 'User login required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'User password required']
    },
    role: {
        type: String,
        required: [true, 'User role required'],
        enum: {
            values: ['admin', 'user'],
            message: "User profile must be 'admin' or 'user'"
        }
    }
});

userSchema.plugin(uniqueValidator, { message: 'Login already exists' });

const User = mongoose.model('users', userSchema);

module.exports = User; 