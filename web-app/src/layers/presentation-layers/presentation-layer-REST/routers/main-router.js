const router = require("express").Router({mergeParams: true})

module.exports = ({projectRESTRouter, userRESTRouter}) => {
    
    router.use('/user', userRESTRouter)
    router.use('/project', projectRESTRouter)
    
    return router

}
