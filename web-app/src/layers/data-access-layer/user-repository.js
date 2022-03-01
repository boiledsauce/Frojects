const { models } = require('./db')

module.exports = () => {

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

                if (error.parent.code == 'ER_DUP_ENTRY'){
                    throw ['Det finns redan en användare med denna e-post']
                }
                console.log(error.parent)
                throw ['Kunde inte skapa användaren i databasen']

            }
        
        },
        
		async getAllUsersWithAccessToProject(projectId){
            console.log("Projektid är: " + projectId)
			try{
				const users = await models.User.findAll({ model: models.Project })
                console.log(users)
                return users

			} catch (error) {
                console.log(error)
                throw ['Kunde inte hämta användare tillhörande projektet']
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
        
        },

        async getUserRealNameById(id){
            try{
                const name = await models.User.findOne({
                    attributes: [
                        'firstName',
                        'lastName'
                    ],
                    where: {
                        id
                    }
                })
            } catch (error) {
                throw ['Kunde inte hämta användarens namn']
            }
        }
    }
}