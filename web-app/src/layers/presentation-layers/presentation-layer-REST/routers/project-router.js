const router = require("express").Router({mergeParams: true})

module.exports = ({taskRESTRouter, projectManager}) => {
    
    router.get('/', async (request, response) => {
        try {
            const user = request.user
            const projects = await projectManager.getAllProjectsByUserId(user.userId)
            const sharedProjects = await projectManager.getProjectsSharedWithUser(user.userId)

            response.json({projects, sharedProjects})
        } catch (errors) {
            response.status(400).json(errors)
        }
    })

    router.post('/', async (request, response) => {
        try {
            const project = {
                name: request.body.projectName,
                ownerId: request.user.id
            }

            const createdProjectId = await projectManager.createProject(project)
            response.json(createdProjectId)
        } catch (errors) {
            console.log(errors)
            response.status(403).json()
        }
    })

    router.use('/:projectId/tasks', taskRESTRouter)

    router.get('/:id', async (request, response) => {
        try{
            const project = await projectManager.getProjectById(request.params.id)
            response.json(project)
        } catch (errors) {
            response.status(400).json(['Kunde inte hämta projekt'])
        }
    })

    router.put('/:id', async (request, response) => {
        try {

            if (request.params.id != request.body.id){
                return response.status(400).json({errors: ['Parameterar för projekt-id matchar inte']})
            }

            const project = {
                id: request.body.id,
                name: request.body.newName
            }
            
            await projectManager.updateProject(project)
            response.json()
          
        } catch (errors) {
            console.log(errors)
            response.status(400).json(errors)
        }
    })

    router.delete('/:id', async (request, response) => {
        try {
            const project = {
                id: request.params.id,
                ownerId: request.user.id
            }
                await projectManager.deleteProject(project.ownerId, project.id)
                response.json()
                

            } catch (errors) {
                console.log(errors)
                response.status(403).json("Bad request")
            }
    })
    
    return router

}