const User = require('../schemas/userSchema');

const createUser = user => {
    return new Promise((resolve, reject) => {
        new User(user).save()
            .then(() => resolve())
            .catch(err => reject(err.message))
    });
}

const listUsers = () => {
    return new Promise((resolve, reject) => {
        User.find().select('-password')
            .then(users => resolve(users))
            .catch(err => reject(err.message))
    });
}

const updateUser = (id, newUser) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(id, newUser, { runValidators: true, context: 'query' })
            .then(result => !result ? reject('Id não encontrado') : resolve())
            .catch(err => reject(err.message))
    });
}

const removeUser = id => {
    return new Promise((resolve, reject) => {
        User.findByIdAndDelete(id)
            .then(result => !result ? reject('Id não encontrado') : resolve())
            .catch(err => reject(err.message))
    });
}

const authenticateUser = (user, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({ user: user, password: password })
            .then(authUser => !authUser ? reject('Nome de usuário ou senha incorretos') : resolve(authUser))
            .catch(err => reject(err.message))
    });
}

module.exports = {
    createUser,
    listUsers,
    updateUser,
    removeUser,
    authenticateUser
}
