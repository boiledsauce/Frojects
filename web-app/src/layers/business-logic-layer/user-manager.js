const userRepository = require('../data-access-layer/user-repository')
const userValidator = require('./user-validator')

exports.createUser = async (user) => {
    const validationErrors = await userValidator.getErrorsNewUser(user)

    if (validationErrors.length > 0){
        return Promise.reject(validationErrors)
    }

    return Promise.resolve(await userRepository.createUser(user))

}

exports.getUserByEmail = async (email) => {
    try{
        return await userRepository.getUserByEmail(email)
    }
    catch (error) {
        return Promise.reject(error)
    }
}

exports.userCredentialsAreValid = async (userCredentials) => {

    const user = await userRepository.getUserByEmail(userCredentials.email)

    return (user.password == userCredentials.password)

}