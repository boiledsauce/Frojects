const { db } = require('./db')

module.exports = () => {

    return {
        
        async createUser(user){

            const query = `INSERT INTO Users 
                            (firstName, lastName, email, openId, hashedPassword) 
                            VALUES (?, ?, ?, ?, ?)`
            
            const values = [
                user.firstName, 
                user.lastName, 
                user.email, 
                user.openId, 
                user.hashedPassword
            ]

            return new Promise((resolve, reject) => {
                db.query(query, values, (error, user) => {
                    if (error) {
                        if (error.parent.code == 'ER_DUP_ENTRY'){
                            reject(['Det finns redan en användare med denna e-post'])
                        }
                        console.log(error.parent)
                        reject(['Kunde inte skapa användaren i databasen'])
                    }

                    resolve(user)
                })
            })
        
        },

        async getAllUsers(){
            const query = 'SELECT * FROM Users '

            return new Promise((resolve, reject) => {
                db.query(query, (error, users) => {
                    if (error) reject(['Kunde inte hämta användare från databasen'])
                    resolve(users)
                })
            })
        
        },

        async getUserById(id){

            const query = 'SELECT * FROM Users WHERE id = ?'

            const values = [id]

            return new Promise((resolve, reject) => {
                db.query(query, values, (error, users) => {
                    if (error) reject(['Ett fel uppstod när användaren skulle hämtas'])
                    if (users.length) resolve(users[0])
                    reject(['Ingen användare med angivet ID hittades'])
                })
            })
            
        },
        
        async getUserByOpenId(openId){

            const query = 'SELECT * FROM Users WHERE openId = ?'

            const values = [openId]

            return new Promise((resolve, reject) => {
                db.query(query, values, (error, users) => {
                    if (error) reject(['Ett fel uppstod när användaren skulle hämtas utifrån OpenID'])
                    if (users.length) resolve(users[0])
                    reject(['Ingen användare med angivet OpenID hittades'])
                })
            })

        },

        async getUserByEmail(email){

            const query = 'SELECT * FROM Users WHERE email = ?'

            const values = [email]

            return new Promise((resolve, reject) => {
                db.query(query, values, (error, users) => {
                    if (error) reject(['Ett fel uppstod när användaren skulle hämtas utifrån e-post'])
                    if (users.length) resolve(users[0])
                    reject(['Ingen användare med angiven e-post hittades'])
                })
            })
        
        },

        async getUserRealNameById(id){

            const query = 'SELECT firstName, lastName FROM Users WHERE id = ?'

            const values = [id]

            return new Promise((resolve, reject) => {
                db.query(query, values, (error, users) => {
                    if (error) reject(['Ett fel uppstod när användarens namn skulle hämtas utifrån ID'])
                    if (users.length) resolve(users[0])
                    reject(['Ingen användare med angivet ID hittades'])
                })
            })

        }

    }

}