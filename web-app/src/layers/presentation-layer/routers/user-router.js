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
        response.redirect('/' + insertedUserId)
    } catch (errors) {
        const model = {
            user,
            errors,
            layout: 'empty'
        }
        response.render('user/register', model)
    }

})

router.get('/:userId', (request, response) => {

})

module.exports = router