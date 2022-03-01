const router = require("express").Router({mergeParams: true})

module.exports = ({taskRouter, projectManager, taskManager, userManager}) => {
    
    router.use('/:projectId/tasks', taskRouter)

    router.get('/', async (request, response) => {
        try {
            const userId = request.session.user.id
            const projects = await projectManager.getAllProjectsByUserId(userId)
    
            const model = {
                projects,
                id: userId
            }

            response.render('project/projectList', model)
        } catch (errors) {
            const model = {
                errors
            }
            response.render('project/projectList', model)
        }
    })

    router.get('/create', (request, response) => {
    
        const model = {
            id: request.session.user.id
        }
    
        response.render('project/create', model)
    })

     
    router.post('/create', async (request, response) => {
        console.log("name", request.body.name)
        const project = {
            name: request.body.name,
            ownerId: request.session.user.id,
            creationDate: "2021-02-02"
        }
        try {
            const insertedProjectId = await projectManager.createProject(project)
            response.redirect(request.baseUrl + '/' + insertedProjectId)
        } catch (errors) {
            const model = {
                id: request.params.id,
                errors
            }
            response.render('project/create', model)
        }
    })

    router.get('/:projectId/share', async (request, response) => {
        const projectId = request.params.projectId

        const users = await userManager.getAllUsersWithAccessToProject(projectId)
        response.render('project/shareUserList', { users })
    })

    router.get('/:projectId', async (request, response) => {
        const projectId = request.params.projectId
        
        try {
            const project = await projectManager.getProject(projectId)
            const tasks = await taskManager.getAllTasksByProjectId(projectId)
            const model = { 
                project,
                tasks
            }
            response.render('project/view', model)
    
        } catch (errors) {
            const model = {
                errors
            }
            response.render('project/view', model)
        }
    })
  
    return router

}