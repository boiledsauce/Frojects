const express = require("express")

module.exports = function({projectRESTRouter, userRESTRouter, userManager}){

    const router = express.Router({mergeParams: true})

    //Authentication
    /*
    router.use('/', (request, response, next) => {
        if (userManager.userIsLoggedIn(request.session) || true){
            next()
        }
        else{
            response.send("no")
        }
    })*/
                    name: request.body.projectName,

    /*
    router.get('/app', (request, response) => {
        response.render('start')
    })*/
    
    router.use('/user', userRESTRouter)
    router.use('/project', projectRESTRouter)
    
    //Use empty layout when not inside /app
    /*
    router.use('/', (request, response, next) => {
        response.locals.layout = 'empty'
        next()
    })*/
    
    
    router.get('/', (request, response) => {
        response.sendStatus(200).json("hehe")
    })
    
    return router

}
