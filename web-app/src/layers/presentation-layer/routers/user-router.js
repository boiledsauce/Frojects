const express = require("express")

const router = express.Router({mergeParams: true})

const userManager = require('../../business-logic-layer/user-manager')

router.get('/register', (request, response) => {
    response.render('user/register', {layout: 'empty'})
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
        
        const insertedUserId = await userManager.createUser(user)
        response.redirect('/user/' + insertedUserId)

    } catch (errors) {

        const model = {
            user,
            layout: 'empty',
            errors
        }
        response.render('user/register', model)
    }

})

router.get('/login', (request, response) => {
    console.log("LOGGING IN")
    response.render('user/login', {layout: 'empty'})
})

router.post('/login', async (request, response) => {
<<<<<<< HEAD
    const userCredentials = {
=======
    
    const loginCredentials = {
>>>>>>> 6c889b8e60a2f61d596d86f0109dbdce8a4797b2
        email: request.body.email,
        password: request.body.password
    }
    
    try{
        const user = await userManager.getUserByEmail(loginCredentials.email)

        console.log(user)

        const session = request.session
        session.userId = 1
        response.redirect('/')
    }
    catch (errors) {
        console.log(errors)
<<<<<<< HEAD
=======
        if (errors instanceof Error){
            errors = ["Ett oväntat fel uppstod"]
        }
>>>>>>> 6c889b8e60a2f61d596d86f0109dbdce8a4797b2
        const model = {
            email: loginCredentials.email,
            errors,
            layout: 'empty'
        }
        response.render('user/login', model)
    }

})

router.post('/logout', (request, response) => {
    request.session.destroy()
    response.redirect('/user/login')
})

module.exports = router