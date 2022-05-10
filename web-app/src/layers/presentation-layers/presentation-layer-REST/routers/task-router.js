const router = require("express").Router({mergeParams: true})

module.exports = ({taskManager, projectManager}) => {

    router.get('/', async (request, response) => {

        try {
            const tasks = await taskManager.getAllTasksByProjectId(request.params.projectId, request.user.userId)

            response.json(tasks)

        } catch (errors) {
            console.log(errors)
            response.status(500).json(errors)
        }

    })
    
    return router

}
