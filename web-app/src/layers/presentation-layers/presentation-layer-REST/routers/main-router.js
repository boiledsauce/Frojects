const express = require("express")

module.exports = function({projectRouter, userRouter, userManager}){

    const router = express.Router({mergeParams: true})

    //Authentication
    router.use('/', (request, response, next) => {
        if (userManager.userIsLoggedIn(request.session) || true){
            next()
        }
        else{
            response.render('errors/403', {layout: 'empty'})
        }
    })
    
    /*
    router.get('/app', (request, response) => {
        response.render('start')
    })*/
    
    router.use('/project', projectRouter)
    
    //Use empty layout when not inside /app
    /*
    router.use('/', (request, response, next) => {
        response.locals.layout = 'empty'
        next()
    })*/
    
    router.use('/user', userRouter)
    
    router.get('/', (request, response) => {
        response.sendStatus(200).json("hehe")
    })
    
    return router

}
