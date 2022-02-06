const express = require("express")

const router = express.Router({mergeParams: true})

const projectManager = require("../../business-logic-layer/project-manager")

router.get('/', async (request, response) => {
    const projects = await projectManager.getAllProjectsByUserId(1)
    const model = { 
        projects,
        id: 1
    }

    console.log(projects)

    response.render('project.hbs', model)
})

router.get('/:id', async (request, response) => {
    const id = request.params.id
    const project = (await projectManager.getProject(id))[0]
    const tasks = await projectManager.getAllTasksByProjectId(id)
    
    const model = { 
        project,
        tasks
    }

    response.render('view-project.hbs', model)
})

router.get('/:id/create', (request, response) => {
    const model = {
        id: 1
    }
    response.render('create-project.hbs', model)
})

router.get('/:id/create-task', (request, response) => {
    const id = request.params.id
    console.log(id)
    
    const model = {
        id
    }
    response.render('create-task.hbs', model)
})

router.post('/:id/create-task', async (request, response) => {
    const _id = request.params.id
    const _title = request.body.title
    const _description = request.body.description
    const _creationDate = "2020-02-05"

    const task = {
        title: _title,
        projectId: _id,
        description: _description,
        creationDate: _creationDate
    }

    projectManager.createTask(task)

    response.redirect('/project/'+_id)
})

router.post('/:id/create', async (request, response) => {
    const _ownerId = request.params.id
    const _name = request.body.name
    const _time = "2021-02-02"
    console.log("HJEHEHEHE")
    console.log(_ownerId, _name, _time)
    console.log(_ownerId, _name, _time)
    console.log(_ownerId, _name, _time)
    console.log(_ownerId, _name, _time)
    console.log(_ownerId, _name, _time)
    console.log(_ownerId, _name, _time)

    const ret = await projectManager.createProject({name: _name, ownerId: _ownerId, creationDate: _time})

    response.redirect('/project')
})

module.exports = router