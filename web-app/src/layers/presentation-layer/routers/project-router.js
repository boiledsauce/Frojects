const express = require("express")

const router = express.Router({mergeParams: true})
const taskRouter = require('./task-router')

const projectManager = require("../../business-logic-layer/project-manager")
const taskManager = require("../../business-logic-layer/task-manager")

router.use('/:id/task', taskRouter)
//http://localhost:3000/project/35/task/49
router.get('/', async (request, response) => {
    try {
        const projects = await projectManager.getAllProjectsByUserId(1)

        const model = { 
            projects,
            id: 1
        }
        response.render('project.hbs', model)
    } catch (errors) {
        const model = {
            errors
        }
        response.render('project.hbs', model)
    }
})

router.get('/:id', async (request, response) => {
    const id = request.params.id

    try {
        const project = (await projectManager.getProject(id))[0]
        console.log(project)
        const tasks = await taskManager.getAllTasksByProjectId(id)
        console.log("TASKS", tasks)
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

router.get('/:id/create', (request, response) => {

    const model = {
        id: 1
    }

    response.render('create-project.hbs', model)
})

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

router.get('/:id/create-task', (request, response) => {
    const id = request.params.id
    console.log(id)
    const model = {
        id
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

router.post('/:id/create', async (request, response) => {
    const project = {
        name: request.body.name,
        ownerId: request.params.id,
        creationDate: "2021-02-02"
    }

    try{
        const insertedProjectId = await projectManager.createProject(project)
        response.redirect(request.baseUrl + '/' + insertedProjectId)
    } catch (errors) {
        const model = {
            id: request.params.id,
            errors
        }
        response.render('create-project', model)
    }
})

module.exports = router