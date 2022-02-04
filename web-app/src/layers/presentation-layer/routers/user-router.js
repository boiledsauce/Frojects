const express = require("express")

const router = express.Router({mergeParams: true})

const userManager = require('../../business-logic-layer/user-manager')

router.get('/register', (request, response) => {
    response.render('user/register', {layout: 'empty'})
})

router.post('/register', (request, response) => {
    const user = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword
    }

    userManager.createUser(user)

})

module.exports = router