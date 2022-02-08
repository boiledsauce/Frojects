const database = require('./db')
const errorCodes = require('../business-logic-layer/error-codes')

exports.createUser = async (user) => {

    const query = 'INSERT INTO User (FirstName, LastName, Email, HashedPassword) VALUES (?, ?, ?, ?)'
    const values = [user.firstName, user.lastName, user.email, user.password]

    database.query(query, values, (error, result) => {
        if (error){
            if (error == 'ER_DUP_ENTRY'){
                return Promise.reject(['Det finns redan en användare med denna e-post'])
            } 
            else {
                return Promise.reject(['errorCodes.COULD_NOT_CREATE_USER'])
            }
        }          
        else{
            return Promise.resolve(result.insertId)
        }
    })

}

exports.getUserByEmail = async (email) => {

    const query = 'SELECT * FROM User WHERE email = ?'
    const values = [email]

    return new Promise((resolve, reject) => {
        database.query(query, values, (error, userList) => {
            if (error){
                console.log(error)
                reject(['Ett oväntat fel uppstod när en användare skulle hämtas från databasen'])
            }   
            else if (userList.length == 0){
                reject([`Ingen användare med e-posten ${email} hittades`])
            }
            else{
                resolve(userList[0])
            }
        })
    })
}