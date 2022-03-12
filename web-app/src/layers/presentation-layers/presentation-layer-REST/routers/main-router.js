const router = require("express").Router({mergeParams: true})

module.exports = ({projectRESTRouter, userRESTRouter}) => {
    
    router.use('/users', userRESTRouter)
    router.use('/projects', projectRESTRouter)
    
    return router

}
