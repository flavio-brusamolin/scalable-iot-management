/* imports */
const crypto = require('crypto');

/* crypto options */
const cryptoSettings = {
    algorithm: 'aes256',
    secret: process.env.SECRET,
    type: 'hex'
}

/* encrypt password */
const encrypt = password => {
    const cipher = crypto.createCipher(cryptoSettings.algorithm, cryptoSettings.secret);
    cipher.update(password);
    return cipher.final(cryptoSettings.type);
}

/* exports */
exports.encrypt = encrypt;