const userRepository = require('../data-access-layer/user-repository')
const userValidator = require('./user-validator')

exports.createUser = async (user) => {

    const errors = userValidator.getErrorsNewUser(user)

    if (errors.length > 0) {
        return Promise.reject(errors)
    }
errors
    try{
        const insertedUserID = await userRepository.createUser(user)
        return Promise.resolve(insertedUserID)
    } catch (error){
        if (error.code == 'ER_DUP_ENTRY'){
            return Promise.reject(["Det finns redan en användare med den e-posten i databasen"])
        } else {
            return Promise.reject(["Användaren kunde inte skapas i databasen"])
        }
    }
}