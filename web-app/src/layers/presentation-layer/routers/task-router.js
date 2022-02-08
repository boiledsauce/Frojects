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


module.exports = router