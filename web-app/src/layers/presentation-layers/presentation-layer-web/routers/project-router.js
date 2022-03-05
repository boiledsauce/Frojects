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
        const project = {
            name: request.body.name,
            ownerId: request.session.user.id
        }
        try {
            const createdProjectId = await projectManager.createProject(project)
            response.redirect(`${request.baseUrl}/${createdProjectId}`)
        } catch (errors) {
            const model = {
                id: request.params.id,
                errors
            }
            response.render('project/create', model)
        }
    })

    //Make projectId available to all views
    router.use('/:projectId', (request, response, next) => {
        response.locals.projectId = request.params.projectId
        next()
    })

    router.get('/:projectId/share', async (request, response) => {

        let model = {}

        try{
            const users = await userManager.getAllUsers()
            const usersWithAccess = await projectManager.getUsersWithAccessToProject(response.locals.projectId)
    
            model = { users }

        } catch (errors) {
            model = { errors }
        }

        response.render('project/shareUserList', model)
    })

    router.post('/:projectId/share', async (request, response) => {
        try{
            const userId = request.body.userId
            const projectId = request.body.projectId

            await projectManager.giveUserAccessToProject(userId, projectId)

            request.flash('message', 'Användaren gavs tillgång till projektet')
            response.redirect(`${request.baseUrl}/${projectId}`)

        } catch (errors){
            const model = {
                userId,
                errors
            }
            response.render('/project/shareUserList', model)
        }

    })

    router.get('/:projectId', async (request, response) => {  
        try {
            const project = await projectManager.getProjectById(response.locals.projectId)
            const tasks = await taskManager.getAllTasksByProjectId(response.locals.projectId)
            const model = {
                project,
                tasks
            }
            response.render('project/view', model)
    
        } catch (errors) {
            response.render('project/view', {errors})
        }
    })
  
    return router

}