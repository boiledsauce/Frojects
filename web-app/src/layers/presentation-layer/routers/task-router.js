const express = require("express")
//const projectRouter = require('./routers/project-router')

const router = express.Router({mergeParams: true})

const taskManager = require("../../business-logic-layer/task-manager")

router.get('/', async (request, response) => {
    response.sendStatus(404)
})

router.get('/:taskId', async (request, response) => {
    try {
        const taskId = request.params.taskId
        const task = (await taskManager.getTaskById(taskId))[0]

        const model = {
            task
        }
        response.render('view-task.hbs', model)
    } catch (errors) {
        const model = {
            errors
        }
        response.render('view-task.hbs', model)
    }
})

router.get('/:taskId/create-comment', async (request, response) => {
    try {
        const id = request.params.id
        const taskId = request.params.taskId
        const task = (await taskManager.getTaskById(taskId))[0]

        const model = {
            id,
            task
        }
        response.render('create-comment.hbs', model)
    } catch (errors) {
        const model = {
            errors
        }
        response.render('create-comment.hbs', model)
    }
})


router.post('/:taskId/create-comment', async (request, response) => {
    const comment = {
        name: request.body.text,
        taskId: request.params.taskId,
        creationDate: "2021-02-08"
    }
    try{
        const insertedCommentId = await projectManager.createProject(comment)
        response.redirect(request.baseUrl)
    } catch (errors) {
        const model = {
            id: request.params.id,
            errors
        }
        response.render('create-comment', model)
    }
})


module.exports = router