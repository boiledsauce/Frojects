const router = require("express").Router({mergeParams: true})

module.exports = ({projectRouter, userRouter, userManager}) => {

    //Authentication
    router.use('/app', (request, response, next) => {
        if (userManager.userIsLoggedIn(request.session)){
            next()
        }
        else{
            response.render('errors/403', {layout: 'empty'})
        }
    })
    
    router.get('/app', (request, response) => {
        response.render('start')
    })
    
    router.use('/app/projects', projectRouter)
    
    //Use empty layout when not inside /app
    router.use('/', (request, response, next) => {
        response.locals.layout = 'empty'
        next()
    })
    
    router.use('/user', userRouter)
    
    router.get('/', (request, response) => {
        response.render('user/welcome')
    })
    
    return router

}
