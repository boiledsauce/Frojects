userRepository = require('../data-access-layer/user-repository')

exports.createUser = async (user) => {
    return await userRepository.createUser(user)
}