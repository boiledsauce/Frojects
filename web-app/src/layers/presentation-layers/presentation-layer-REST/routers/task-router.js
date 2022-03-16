const router = require("express").Router({mergeParams: true})

module.exports = ({taskManager, projectManager}) => {

    router.get('/', async (request, response) => {
        try{

            if (await projectManager.userHasAccessToProject(request.user.userId, request.params.projectId)){
                const tasks = await taskManager.getAllTasksByProjectId(request.params.projectId)
                response.json(tasks)
            } else {
                response.status(403).json({errors: ['Användaren saknar tillgång till projektet']})
            }

        } catch (errors) {
            console.log(errors)
            response.status(500).json(errors)
        }
    })
    
    return router

}
