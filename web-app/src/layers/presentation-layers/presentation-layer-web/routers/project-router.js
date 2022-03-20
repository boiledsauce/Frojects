const router = require("express").Router({mergeParams: true})

module.exports = ({taskRouter, projectManager, taskManager, userManager}) => {

    //Make projectId available to all views
    router.use('/:projectId', (request, response, next) => {
        response.locals.projectId = request.params.projectId
        next()
    })
    
    router.use('/:projectId/tasks', taskRouter)

    router.get('/', async (request, response) => {
        let model

        try {
            const userId = request.session.user.id
            const projects = await projectManager.getAllProjectsByUserId(userId)
            const sharedProjects = await projectManager.getProjectsSharedWithUser(userId)
    
            model = {projects, sharedProjects}

        } catch (errors) {
            model = {errors}
        }
        response.render('project/projectList', model)

    })

    router.get('/create', (request, response) => {
    
        const model = {
            id: request.session.user.id
        }
    
        response.render('project/create', model)
    })

     
    router.post('/create', async (request, response) => {
        try {
            const project = {
                name: request.body.name,
                ownerId: request.session.user.id
            }

            const createdProjectId = await projectManager.createProject(project)
            response.redirect(`${request.baseUrl}/${createdProjectId}`)

        } catch (errors) {
            const model = {
                errors,
                name: request.body.name
            }
            response.render('project/create', model)
        }
    })

    router.get('/:projectId/share', async (request, response) => {
        let model

        try{
            const users = await userManager.getAllUsers()
            model = { users }

        } catch (errors) {
            model = { errors }
        }
        response.render('project/shareUserList', model)
    })

    router.post('/:projectId/share', async (request, response) => {
        const userId = request.body.userId

        try{
            const projectId = request.body.projectId
            const userActionPerformerId = request.session.user.id
            await projectManager.giveUserAccessToProject(userActionPerformerId, userId, projectId)

            request.flash('message', 'Användaren gavs tillgång till projektet')
            response.redirect(`${request.baseUrl}/${projectId}/usersWithAccess`)

        } catch (errors){
            const model = {
                userId,
                errors
            }
            response.render('project/shareUserList', model)
        }

    })

    router.get('/:projectId/usersWithAccess', async (request, response) => {
        try{
            const project = await projectManager.getProjectById(request.params.projectId)
            const userIsOwner = request.session.user.id == project.ownerId
            const usersWithAccess = await projectManager.getUsersWithAccessToProject(response.locals.projectId)
            response.render('project/usersWithAccess', {usersWithAccess, userIsOwner})

        } catch (errors) {
            response.render('project/usersWithAccess', {errors})
        }
    })

    router.get('/:projectId/removeUser/:userId', async (request, response) => {
        let model

        try{
            const user = await userManager.getUserById(request.params.userId)

            model = {user}

        } catch (errors) {
            model = {errors}
        }

        response.render('project/removeUser', model)
    })

    router.post('/:projectId/removeUser/:userId', async (request, response) => {
        try{
            const userId = request.body.userId
            const projectId = response.locals.projectId

            await projectManager.revokeUserAccessToProject(userId, projectId)

            request.flash('message', 'Användaren togs bort från projektet')
            response.redirect(`${request.baseUrl}/${projectId}/usersWithAccess`)

        } catch (errors) {
            response.render('project/removeUser', {errors})
        }
    })

    router.get('/:projectId', async (request, response) => {
        let model
        const userId = request.session.user.id
        try {
            const project = await projectManager.getProjectById(response.locals.projectId)
            const tasks = await taskManager.getAllTasksByProjectId(response.locals.projectId)
            const userIsOwner = userId == project.ownerId
            model = {project, tasks, userIsOwner}
    
        } catch (errors) {
            model = {errors}
        }

        response.render('project/view', model)
    })

    router.get('/:projectId/delete', async (request, response) => {
        let model

        try {
            const project = await projectManager.getProjectById(response.locals.projectId)
            model = {project}
        } catch (errors) {
            model = {errors}
        }

        response.render('project/delete', model)
    })

    router.post('/:projectId/delete', async (request, response) => {
        try {
            await projectManager.deleteProject(request.params.projectId, request.session.user.id)
            response.redirect(request.baseUrl + '/')

        } catch (errors) {
            const model = {errors}
            response.render('project/delete', model)
        }

    })

    router.get('/:projectId/update', async (request, response) => {
        let model

        try {
            const project = await projectManager.getProjectById(response.locals.projectId)
            model = {project}
        } catch (errors) {
            model = {errors}
        }

        response.render('project/update', model)
    })

    router.post('/:projectId/update', async (request, response) => {
        const project = {
            id: request.params.projectId,
            ownerId: request.session.user.id,
            name: request.body.name
        }
        console.log(project)
        try {
            await projectManager.updateProject(project)
            response.redirect(request.baseUrl + '/' + project.id)

        } catch (errors) {
            const model = {errors}
            response.render('project/update', model)
        }

    })
  
    return router

}