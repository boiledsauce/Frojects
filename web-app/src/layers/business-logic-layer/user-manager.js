const userRepository = require('../data-access-layer/user-repository')
const userValidator = require('./user-validator')

exports.createUser = async (user) => {

    const errors = userValidator.getErrorsNewUser(user)

    if (errors.length > 0) {
        console.log("Här finns errors!")
        return Promise.reject(errors)
    }

    return await userRepository.createUser(user)
}