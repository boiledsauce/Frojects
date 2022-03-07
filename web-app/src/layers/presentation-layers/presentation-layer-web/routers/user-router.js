const router = require("express").Router({mergeParams: true})
const axios = require("axios")
const qs = require("querystring")

module.exports = ({userManager}) => {
    
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
            const createdUser = await userManager.createUser(user)

            request.session.user = createdUser

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
    
    router.get('/google-login', async (request, response) => {
      response.redirect("https://accounts.google.com/o/oauth2/auth?client_id=845630289985-h1s1qhcu7h78kmi7mogcqeplqbtta4nb.apps.googleusercontent.com&redirect_uri=http://localhost:3000/user/google-login-response&response_type=code&scope=openid")  
    })

    router.get('/google-login-response', async (request, response) => {
        const authorizationCode = request.query.code
        try {
            const authResponse = await axios.post("https://www.googleapis.com/oauth2/v4/token",
            {
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                params: {
                    code: authorizationCode,
                    client_id: "845630289985-h1s1qhcu7h78kmi7mogcqeplqbtta4nb.apps.googleusercontent.com",
                    client_secret: "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",
                    redirect_uri: "http://localhost:3000/user/google-login-response",
                    grant_type: "authorization_code"
                
                }
              })
              console.log(authResponse)

              /*
            const authResponse = await fetch('https://www.googleapis.com/oauth2/v4/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })*/

        

            //console.log(await authResponse.json())
            response.send(await authResponse)
        } catch (errors) {
            console.log(errors)
            response.sendStatus(404)
        }
    })

    router.post('/login', async (request, response) => {
        
        const loginCredentials = {
            email: request.body.email,
            password: request.body.password
        }
        
        try{
            const user = await userManager.getUserByEmail(loginCredentials.email)
    
            if (await userManager.loginCredentialsMatchUser(loginCredentials, user)){

                request.session.user = user
    
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

            if (errors instanceof Error){
                console.log(errors)
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