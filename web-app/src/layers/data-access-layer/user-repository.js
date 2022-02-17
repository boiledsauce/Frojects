const { models } = require('./db')

module.exports = function createUserRepository(){

    return {
        
        async createUser(user){

            try{
                const createdUser = await models.User.create({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    hashedPassword: user.hashedPassword
                })
                
                return createdUser

            } catch (error) {

                if (error.code == 'ER_DUP_ENTRY'){
                    throw ['Det finns redan en användare med denna e-post']
                }

                console.log(error)
                throw ['Kunde inte skapa användaren i databasen']

            }
        
        },
        
        async getUserByEmail(email){

            try{
                const user = await models.User.findOne({
                    where: {
                        email: email
                    }
                })

                if (user){
                    return user
                }
                throw ['Ingen användare med e-posten hittades']

            } catch (error) {

                if (error instanceof Error){
                    console.log(error)
                    throw ['Ett problem med databasen uppstod när en användare med e-posten skulle hämtas']
                }
                throw error

            }
        
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