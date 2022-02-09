const bcrypt = require('bcrypt')
const saltRounds = 10

const userValidator = require('./user-validator')

module.exports = function createUserManager({userRepository}){

    return {

        async createUser(user){
            try{
                const validationErrors = userValidator.getErrorsNewUser(user)
        
                if (validationErrors.length > 0){
                    throw validationErrors
                }
            
                user.hashedPassword = await getHashFromPassword(user.password)
                console.log("Hashat: " + user.hashedPassword)
                delete user.password
        
                return await userRepository.createUser(user)
            }
            catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    errors = ['Ett oväntat fel uppstod']
                }
                throw errors
            }
        
        },
        
        async getUserByEmail(email){
            try{
                return await userRepository.getUserByEmail(email)
            }
            catch (error) {
                throw error
            }
        },
        
        async loginCredentialsMatchUser(loginCredentials, user){
            return new Promise((resolve, reject) => {
                bcrypt.compare(loginCredentials.password, user.HashedPassword, (error, result) => {
                    if (error){
                        console.log(error)
                        reject(['Lösenorden kunde inte jämföras'])
                    }
                    resolve(result)
                })
            })
        },
        
        async userIsLoggedIn(session){
            return ('user' in session)
        },
        
        async getHashFromPassword(password){
            return new Promise((resolve, reject) => {
                bcrypt.genSalt(saltRounds, (error, salt) => {
                    if (error){
                        console.log(error)
                        reject(['Ett salt för lösenordet kunde inte genereras'])
                    }
            
                    bcrypt.hash(password, salt, (error, hash) => {
                        if (error){
                            console.log(error)
                            reject(['Lösenordet kunde inte hashas'])
                        }
                        
                        resolve(hash)
                    })
                })
            })
        }

    }

}