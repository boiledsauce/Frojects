const bcrypt = require('bcrypt')
const saltRounds = 10

const userValidator = require('./user-validator')
const axios = require("axios")
const qs = require("querystring")

const CLIENT_ID = "845630289985-h1s1qhcu7h78kmi7mogcqeplqbtta4nb.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REDIRECT_URI = "http://localhost:3000/user/google-login-response"
const GRANT_TYPE = "authorization_code"
const GOOGLE_AUTH_TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token"

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(CLIENT_ID)

const getHashFromPassword = async (password) => {
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


module.exports = ({userRepository}) => {

    return {

        async getGoogleAuthCodeResponse(authorizationCode){

            try {
                return await axios.post(GOOGLE_AUTH_TOKEN_URL, qs.stringify({            
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    grant_type: GRANT_TYPE,             
                    code: authorizationCode,
                    redirect_uri: REDIRECT_URI,   
                }), {
                    headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
                })

            } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ['Ett oväntat fel inträffade när autentisteringskod från Google skulle hämtas']
                }
                throw errors
            }

        },

        async getIdTicket(idToken){

            try {
                const ticket = await client.verifyIdToken({
                    idToken,
                    audience: CLIENT_ID
                })

                return ticket

            } catch (errors) {
                throw ['Ett fel uppstod när en ID Token skulle verifieras']
            }

        },

        async createUser(user){

            try{
                if (!user.openId){
                    const validationErrors = userValidator.getErrorsNewUser(user)
            
                    if (validationErrors.length > 0) throw validationErrors
                
                    user.hashedPassword = await getHashFromPassword(user.password)
                    delete user.password
                }

                return await userRepository.createUser(user)

            }
            catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ['Ett oväntat fel uppstod när användaren skulle skapas']
                }
                throw errors
            }
        
        },
        
        async getUserByOpenId(openId){

            try {
                return await userRepository.getUserByOpenId(openId)

            } catch (errors) {
                throw errors
            }

        },

        async getUserByEmail(email){

            try{
                return await userRepository.getUserByEmail(email)
            }
            catch (errors) {
                throw errors
            }

        },

        async getAllUsers(){

            try{
                return await userRepository.getAllUsers()

            } catch (errors) {
                throw errors
            }

        },

        async getUserById(id){

            try{
                return await userRepository.getUserById(id)

            } catch (errors) {
                throw errors
            }

        },

        async getUserRealNameById(id){

            try{
                return await userRepository.getUserRealNameById(id)
            } catch (errors) {
                throw errors
            }

        },
        
        async loginCredentialsMatchUser(loginCredentials, user){

            return new Promise((resolve, reject) => {
                bcrypt.compare(loginCredentials.password, user.hashedPassword, (error, result) => {
                    if (error){
                        console.log(error)
                        reject(['Lösenorden kunde inte jämföras'])
                    }
                    resolve(result)
                })
            })
            
        },
        
        userIsLoggedIn(session){
            return session.hasOwnProperty('user')
        }

    }

}