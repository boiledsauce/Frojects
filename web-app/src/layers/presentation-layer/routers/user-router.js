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
    response.render('user/login', {layout: 'empty'})
})

router.post('/login', async (request, response) => {

    const userCredentials = {
        email: request.body.email,
        password: request.body.password
    }

    try{
        const user = await userManager.getUserByEmail(userCredentials.email)

        request.session.userId = user.Id

        response.redirect('/')

    } catch (errors) {
        const model = {
            email: userCredentials.email,
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