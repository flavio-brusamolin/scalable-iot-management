require('dotenv-safe').config();

const crypto = require('crypto');

const cryptoSettings = {
    algorithm: 'aes256',
    secret: process.env.SECRET,
    type: 'hex'
}

const encrypt = password => {
    const cipher = crypto.createCipher(cryptoSettings.algorithm, cryptoSettings.secret);
    cipher.update(password);
    return cipher.final(cryptoSettings.type);
}

exports.encrypt = encrypt;