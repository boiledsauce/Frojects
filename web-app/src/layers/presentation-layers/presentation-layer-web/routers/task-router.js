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
            response.render('task/create', model)
        }
    })
    
    router.get('/:taskId/create-comment', async (request, response) => {
        
        const taskId = request.params.taskId
    
        try {
            const task = (await taskManager.getTaskById(taskId))[0]
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
    
    
    router.post('/:taskId/create-comment', async (request, response) => {
        const comment = {
            text: request.body.text,
            taskId: request.params.taskId,
            authorId: request.session.user.id,
            creationDate: "2021-02-08"
        }
        try{
            console.log(comment.taskId, comment.authorId)

            const insertedCommentId = await commentManager.createComment(comment)
            response.redirect(`/app/project/${request.params.id}/task/${request.params.taskId}`)
        } catch (errors) {
            const model = {
                id: request.params.id,
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
            const comment = await commentManager.getAllCommentsByTaskId(taskId)
            console.log(task)
            const model = {
                task,
                comment,
                projectId: request.params.id
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
