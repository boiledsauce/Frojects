const express = require("express")
//const projectRouter = require('./routers/project-router')

const router = express.Router({mergeParams: true})

const taskManager = require("../../business-logic-layer/task-manager")
const commentManager = require("../../business-logic-layer/comment-manager")

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
        const task = (await taskManager.getTaskById(taskId))[0]
        const model = {
            id: request.params.id,
            taskId: request.params.taskId,
            task
        }
        
        response.redirect(router.baseUrl, model)
    } catch (errors) {
        const model = {
            id: request.params.id,
            taskId: request.params.taskId,
            errors
        }
        response.render('create-comment.hbs', model)
    }
})


router.post('/:taskId/create-comment', async (request, response) => {
    console.log(request.params.taskId)
    const comment = {
        text: request.body.text,
        taskId: request.params.taskId,
        creationDate: "2021-02-08"
    }
    try{
        const insertedCommentId = await commentManager.createComment(comment)
        response.redirect(request.baseUrl)
    } catch (errors) {
        const model = {
            id: request.params.id,
            taskId: request.params.taskId,
            errors
        }
        response.render('create-comment', model)
    }
})


module.exports = router