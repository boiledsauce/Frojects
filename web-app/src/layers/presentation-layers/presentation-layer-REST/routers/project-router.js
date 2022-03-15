const router = require("express").Router({mergeParams: true})

module.exports = ({taskRouter, projectManager}) => {
    
    router.use('/:id/tasks', taskRouter)
    
    router.get('/', async (request, response) => {
        try {
            const user = request.user
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
                ownerId: request.user.id
            }

            const createdProject = await projectManager.createProject(project)
            response.status(201).json(createdProject)
        } catch (errors) {
            console.log(errors)
            response.status(500).json("Internal server error")
        }
    })

    router.get('/:id', async (request, response) => {
        try{
            const project = await projectManager.getProjectById(request.params.id)
            response.json(project)
        } catch (errors) {
            response.status(400)
            console.log(errors)
            throw ['Kunde inte hämta projekt']
        }
    })

    router.put('/:id', async (request, response) => {
        try {
            const project = {
                id: request.params.id,
                name: request.body.projectName,
                ownerId: request.user.id
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
    
    return router

}