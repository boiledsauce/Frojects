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
                name: request.body.name,
                ownerId: request.user.userId
            }

            const createdProjectId = await projectManager.createProject(project)
            response.json(createdProjectId)
        } catch (errors) {
            if (errors instanceof Error){
                console.log(errors)
                errors = ['Ett oväntat fel uppstod']
            }
            response.status(403).json(errors)
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
            response.status(204).json()
          
        } catch (errors) {
            if (errors instanceof Error){
                console.log(errors)
                errors = ['Projektet uppdaterades inte']
            }
            response.status(400).json(errors)
        }
    })

    router.delete('/:id', async (request, response) => {
        try {
            await projectManager.deleteProject(request.params.id, request.user.userId)
            response.status(204).json()

            } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    errors = ['Projektet kunde inte tas bort']
                }
                response.status(403).json(errors)
            }
    })
    
    return router

}