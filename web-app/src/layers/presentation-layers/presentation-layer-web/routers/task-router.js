const router = require("express").Router({mergeParams: true})

module.exports = ({taskManager, commentManager}) => {

    router.get('/create', (request, response) => {
        const taskId = request.params.id
        const model = {
            taskId
        }
        response.render('task/create', model)
    })
    
    router.post('/create', async (request, response) => {
        const task = {
            title: request.body.title,
            projectId: request.params.projectId,
            description: request.body.description,
            date: request.body.date,
            creationDate: "2020-02-05"
        }
    
        try {
            const insertedTaskId = await taskManager.createTask(task)
            const deadline = request.body.date
            const insertedDeadline = await taskManager.createTaskDeadline(insertedTaskId, deadline)
            response.redirect(`/app/projects/${task.projectId}`)
        }
        catch (errors) {
            const model = {
                id: request.params.id,
                errors
            }
            response.render('task/create', model)
        }
    })
    
    router.get('/:taskId/create-comment', async (request, response) => {
        
        const taskId = request.params.taskId
    
        try {
            const task = await taskManager.getTaskById(taskId)
            const model = {
                projectId: request.params.projectId,
                taskId: request.params.taskId,
                task
            }
            response.render('comment/create', model)
        } catch (errors) {
            const model = {
                projectId: request.params.projectId,
                taskId: request.params.taskId,
                errors
            }
            response.render('comment/create', model)
        }
    })
    
    router.post('/:taskId/complete-task', async (request, response) => {
        const taskId = request.params.taskId

        try {
            const id = request.params.projectId
            const result = await taskManager.completeTask(taskId)
            response.redirect(`/app/projects/${id}`)

        } catch (errors) { 
            console.log(errors)
            response.redirect(request.baseUrl + '/' + taskId)
        }
    })

    router.post('/:taskId/create-comment', async (request, response) => {
        const comment = {
            text: request.body.text,
            taskId: request.params.taskId,
            authorId: request.session.user.id,
            creationDate: "2021-02-08"
        }
        try{
            const insertedCommentId = await commentManager.createComment(comment)
            response.redirect(`/app/projects/${request.params.projectId}/tasks/${request.params.taskId}`)
        } catch (errors) {
            const model = {
                id: request.params.projectId,
                taskId: request.params.taskId,
                errors
            }
            console.log(errors)
            response.render('comment/create', model)
        }
    })

    router.get('/:taskId', async (request, response) => {
        try {
            const taskId = request.params.taskId
            const task = await taskManager.getTaskById(taskId)
            const comments = await commentManager.getAllCommentsByTaskId(taskId)

            const model = {
                task,
                comments,
                projectId: request.params.projectId
            }
            response.render('task/view', model)
        } catch (errors) {
            const model = {
                errors
            }
            response.render('task/view', model)
        }
    })
    
    return router

}
