/* imports */
const User = require('../schemas/userSchema');

const handleError = require('../utils/handleError');

/* create new user */
const createUser = user => {
    return new Promise((resolve, reject) => {
        new User(user).save()
            .then(() => resolve())
            .catch(err => reject(handleError(err.message)))
    });
}

/* list users */
const listUsers = () => {
    return new Promise((resolve, reject) => {
        User.find().select('-password')
            .then(users => resolve(users))
            .catch(err => reject(handleError(err.message)))
    });
}

/* update user data */
const updateUser = (id, newUser) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(id, newUser, { runValidators: true, context: 'query' })
            .then(result => !result ? reject('User not found') : resolve())
            .catch(err => reject(handleError(err.message)))
    });
}

/* remove user */
const removeUser = id => {
    return new Promise((resolve, reject) => {
        User.findByIdAndDelete(id)
            .then(result => !result ? reject('User not found') : resolve())
            .catch(err => reject(handleError(err.message)))
    });
}

/* authenticate user by username and password */
const authenticateUser = (user, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({ user: user, password: password })
            .then(authUser => !authUser ? reject('Incorrect username or password') : resolve(authUser))
            .catch(err => reject(handleError(err.message)))
    });
}

/* exports */
module.exports = {
    createUser,
    listUsers,
    updateUser,
    removeUser,
    authenticateUser
}
