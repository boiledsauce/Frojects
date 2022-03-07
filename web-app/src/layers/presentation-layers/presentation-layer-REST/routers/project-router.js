const router = require("express").Router({mergeParams: true})

module.exports = ({taskRouter, projectManager, taskManager}) => {
    
    router.use('/:id/task', taskRouter)
    
    router.get('/', async (request, response) => {
        try {
            const user = request.user
            console.log(user)
            const projects = await projectManager.getAllProjectsByUserId(user.userId)
            const sharedProjects = await projectManager.getProjectsSharedWithUser(user.userId)

            response.json({projects, sharedProjects})
        } catch (errors) {
            response.json(errors)
        }
    })

    router.post('/', async (request, response) => {
        try {
            const project = {
                name: request.body.projectName,
                ownerId: request.user.id,
                //creationDate: "2021-02-20"
            }

            const createdProject = await projectManager.createProject(project)
            response.json(createdProject)
        } catch (errors) {
            console.log(errors)
            response.status(403).json("Bad request")
        }
    })


    router.put('/:id', async (request, response) => {
        try {
            const project = {
                id: request.params.id,
                name: request.body.projectName,
                ownerId: request.user.id,
                //creationDate: "2021-02-20"
            }
            
            const updatedProject = await projectManager.updateProject(project)
            response.json(updatedProject)
          
        } catch (errors) {
            console.log(errors)
            response.status(403).json("Bad request")
        }
    })

    router.delete('/:id', async (request, response) => {
        try {
            const project = {
                id: request.params.id,
                ownerId: request.user.id
            }
                const deletedResult = await projectManager.deleteProject(project.ownerId, project.id)
                response.json(deletedResult)
                

            } catch (errors) {
                console.log(errors)
                response.status(403).json("Bad request")
            }
    })
/*
    router.get('/:id', async (request, response) => {
        const id = request.params.id
        
        try {
            const project = await projectManager.getProject(id)
            const tasks = await taskManager.getAllTasksByProjectId(id)
            console.log(tasks)
            const model = { 
                project,
                tasks
            }
            response.render('view-project.hbs', model)
    
        } catch (errors) {
            const model = {
                errors
            }
            response.render('view-project.hbs', model)
        }
    })
*/
    /*
    router.get('/:id', (request, response) => {
        const id = request.params.id
        console.log(id)
        const model = {
            id
        }
        response.render('create-task.hbs', model)
    })
    */
    /*
    router.get('/:id/create-task', (request, response) => {
        const taskId = request.params.id
        const model = {
            taskId
        }
        response.render('create-task.hbs', model)
    })
    
    router.post('/:id/create-task', async (request, response) => {
        console.log(request.params.id)
        const task = {
            title: request.body.title,
            projectId: request.params.id,
            description: request.body.description,
            creationDate: "2020-02-05"
        }
    
        try {
            const insertedTaskId = await taskManager.createTask(task)
            const projectId = request.params.id
            response.redirect(request.baseUrl + '/' + projectId)
        }
        catch (errors) {
            const model = {
                id: request.params.id,
                errors
            }
            response.render('create-task.hbs', model)
        }
    })
    */
    /*
    router.get('/:id/create-task', (request, response) => {
        const id = request.params.id
        
        const model = {
            id
        }
        response.render('create-task.hbs', model)
    })*/
    
    /*
    router.post('/:id/create-task', async (request, response) => {
    
        const task = {
            title: request.body.title,
            projectId: request.params.id,
            description: request.body.description,
            creationDate: "2020-02-05"
        }
    
        try {
            const insertedTaskId = await projectManager.createTask(task)
            const projectId = request.params.id
            response.redirect(request.baseUrl + '/' + projectId)
        }
        catch (errors) {
            const model = {
                id: request.params.id,
                errors
            }
            response.render('create-task.hbs', model)
        }
    })
    */
   
    
    return router

}