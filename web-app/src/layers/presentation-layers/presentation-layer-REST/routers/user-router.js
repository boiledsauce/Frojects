const express = require("express")

createUserSession = (session, user) => {
    session.user = {
        id: user.Id,
        firstName: user.FirstName,
        lastName: user.LastName,
        email: user.Email
    }
}

module.exports = function({userManager}){

    const router = express.Router({mergeParams: true})
    
    router.get('/register', (request, response) => {
        response.render('user/register')
    })
    
    router.post('/register', async (request, response) => {
    
        const user = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password,
            confirmPassword: request.body.confirmPassword
        }
    
        try{
            user.id = await userManager.createUser(user)

            createUserSession(request.session, user)

            request.flash('message', 'Ditt konto har skapats. Välkommen till Frojects!')
            response.redirect('/app')
    
        } catch (errors) {
    
            const model = {
                user,
                errors
            }
            response.render('user/register', model)
        }
    
    })
    
    router.get('/login', (request, response) => {
        response.render('user/login')
    })
    
    router.post('/login', async (request, response) => {
        
        const loginCredentials = {
            email: request.body.email,
            password: request.body.password
        }
        
        try{
            const user = await userManager.getUserByEmail(loginCredentials.email)
    
            if (await userManager.loginCredentialsMatchUser(loginCredentials, user)){
                delete user.password

                createUserSession(request.session, user)
    
                request.flash('message', 'Välkommen in i stugan!')
                response.redirect('/app')
            }
            else{
                const model = {
                    email: loginCredentials.email,
                    errors: ['Felaktigt lösenord']
                }
                response.render('user/login', model)
            }
        }
        catch (errors) {
            console.log(errors)
            if (errors instanceof Error){
                errors = ["Ett oväntat fel uppstod"]
            }
            const model = {
                email: loginCredentials.email,
                errors
            }
            response.render('user/login', model)
        }
    
    })
    
    router.post('/logout', (request, response) => {
    
        const logoutValue = request.body.logout
    
        if (logoutValue == 'logout'){
            delete request.session.user
    
            request.flash('message', 'Du har loggats ut')
    
            response.redirect('/user/login')
        }
    
    })
    
    return router

}