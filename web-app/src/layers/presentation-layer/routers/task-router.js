const express = require("express")

module.exports = function({taskManager, commentManager}){

    const router = express.Router({mergeParams: true})
    
    router.get('/', async (request, response) => {
        response.sendStatus(404)
    })
    
    router.get('/:taskId/create-comment', async (request, response) => {
        
    
        try {
            const task = (await taskManager.getTaskById(taskId))[0]
            const model = {
                id: request.params.id,
                taskId: request.params.taskId,
                task
            }
            response.render('create-comment.hbs', model)
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
    
        const comment = {
            text: request.body.text,
            taskId: request.params.taskId,
            authorId: request.params.id,
            creationDate: "2021-02-08"
        }
        try{
            const insertedCommentId = await commentManager.createComment(comment)
            response.redirect(`/project/${request.params.id}/task/${request.params.taskId}`)
        } catch (errors) {
            const model = {
                id: request.params.id,
                taskId: request.params.taskId,
                errors
            }
            console.log(errors)
            response.render('create-comment.hbs', model)
        }
    })

    router.get('/:taskId', async (request, response) => {
        try {
            const taskId = request.params.taskId
            const task = (await taskManager.getTaskById(taskId))[0]
    
            const model = {
                task,
                projectId: request.params.id
            }
            response.render('view-task.hbs', model)
        } catch (errors) {
            const model = {
                errors
            }
            response.render('view-task.hbs', model)
        }
    })
    
    return router

}
