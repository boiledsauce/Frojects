const database = require('./db')

module.exports = function createUserRepository(){

    return {
        
        async createUser(user){
        
            const query = 'INSERT INTO User (FirstName, LastName, Email, HashedPassword) VALUES (?, ?, ?, ?)'
            const values = [user.firstName, user.lastName, user.email, user.hashedPassword]
        
            return new Promise((resolve, reject) => {
                database.query(query, values, (error, result) => {
                    if (error){
                        if (error == 'ER_DUP_ENTRY'){
                            reject(['Det finns redan en användare med denna e-post'])
                        } 
                        else {
                            reject(['Kunde inte skapa användaren i databasen'])
                        }
                    }          
                    else{
                        resolve(result.insertId)
                    }
                })
            })
        
        },
        
        async getUserByEmail(email){
        
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

    }
}