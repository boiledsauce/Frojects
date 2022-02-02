const express = require("express")

const router = express.Router({mergeParams: true})

const projectManager = require("../../business-logic-layer/project-manager")

router.get('/', async (request, response) => {
    const projects = await projectManager.getAllProjectsByUserId(1)
    const model = { 
        project: projects,
        id: 1
    }

    response.render('project.hbs', model)
})

router.get('/:id', async (request, response) => {
    const id = request.params.id
    const _project = await projectManager.getProject(id)[0]
    const _tasks = await projectManager.getAllTasksByProjectId(id)
    
    const model = { 
        project: _project,
        tasks: _tasks
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

    response.redirect('/:'+_id+'', task)
})

router.post('/:id/create', async (request, response) => {
    const _ownerId = request.params.id
    const _name = request.body.name
    const _time = "2021-02-02"
    const ret = await projectManager.createProject({name: _name, ownerId: _ownerId, creationDate: _time})
    console.log(ret)

    response.redirect('/project')
})

module.exports = router