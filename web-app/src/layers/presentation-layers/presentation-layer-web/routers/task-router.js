const router = require("express").Router({mergeParams: true})

module.exports = ({taskManager, commentManager, projectManager}) => {

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
        }
    
        try {
            const insertedTaskId = await taskManager.createTask(task)
            const deadline = request.body.date
            const insertedDeadline = await taskManager.createTaskDeadline(insertedTaskId, deadline)
            response.redirect(`/app/projects/${task.projectId}`)
        }
        catch (errors) {
            const model = {
                errors,
                title: task.title,
                description: task.description,
                date: task.date
            }
            response.render('task/create', model)
        }
    })
    
    router.get('/:taskId/comment/:commentId/delete', async (request, response) => {
        let model
        try {
            const task = await taskManager.getTaskById(request.params.taskId)
            const comment = await commentManager.getCommentById(request.params.commentId)

            model = {task, comment}
            response.render('comment/delete', model)
        } catch (errors) {
            model = {errors}
            response.render('comment/delete', model)
        }
    })

    router.post('/:taskId/comment/:commentId/delete', async (request, response) => {
        let model
        try {
            await commentManager.deleteComment(request.params.commentId, request.session.user.id)
            response.redirect(`/app/projects/${request.params.projectId}/tasks/${request.params.taskId}`)
        } catch (errors) {
            console.log(errors)
            model = {errors}
            response.render('comment/delete', model)
        }
    })

    router.get('/:taskId/comment/:commentId/update', async (request, response) => {
        let model

        try {
            const comment = await commentManager.getCommentById(request.params.commentId)

            model = {
                comment,
                projectId: request.params.projectId
            }

        } catch (errors) {
            model = {errors}
        }

        response.render('comment/update', model)
    })

    router.post('/:taskId/comment/:commentId/update', async (request, response) => {
        let model

        try {
            const comment = {
                id: request.params.commentId,
                text: request.body.text
            }
            const userId = request.session.user.id
            await commentManager.updateComment(comment, userId)
            response.redirect(`/app/projects/${request.params.projectId}/tasks/${request.params.taskId}`)

        } catch (errors) {
            console.log(errors)
            model = {errors}
            response.render('comment/update', model)
        }
    })

    router.get('/:taskId/comment/:commentId', async (request, response) => {
        response.redirect(`/app/projects/${request.params.projectId}/tasks/${request.params.taskId}`)
    })

    router.get('/:taskId/comment', async (request, response) => {
        response.redirect(`/app/projects/${request.params.projectId}/tasks/${request.params.taskId}`)
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
            await commentManager.createComment(comment)
            
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
        let model

        const userId = request.session.user.id
        const taskId = request.params.taskId

        try {
            const task = await taskManager.getTaskById(taskId)
            const comments = await commentManager.getAllCommentsByTaskId(taskId, userId)
            model = {
                task,
                comments,
                projectId: request.params.projectId
            }
            


        } catch (errors) {
            model = { errors }
        }

        response.render('task/view', model)
    })

    router.get('/:taskId/update', async (request, response) => {
        let model

        try {
            const taskId = request.params.taskId
            const task = await taskManager.getTaskById(taskId)
            task.date = task.deadlineFormatted
            model = {
                task,
                projectId: request.params.projectId
            }

        } catch (errors) {
            model = {errors}
        }

        response.render('task/update', model)
    })

    router.post('/:taskId/update', async (request, response) => {
        let model
        
        const task = {
            taskId: request.params.taskId,
            title: request.body.title,
            description: request.body.description,
            date: request.body.date
        }
        try {
            await taskManager.updateTask(task)
            response.redirect(request.baseUrl + '/' + task.taskId)

        } catch (errors) {
            model = {task, errors}
            response.render('task/update', model)
        }
    })

    router.get('/:taskId/delete', async (request, response) => {
        let model

        try {
            const task = await taskManager.getTaskById(request.params.taskId)
            model = {task}
            response.render('task/delete', model)

        } catch (errors) {
            model = {errors}
            response.render('task/delete', model)
        }
    })

    router.post('/:taskId/delete', async (request, response) => {
        let model

        try {
            await taskManager.deleteTask(request.params.taskId)
            response.redirect(request.baseUrl)

        } catch (errors) {
            model = {errors}
            response.render('task/delete', model)
        }
    })

    router.get('/', async (request, response) => {
        response.redirect(`/app/projects/${response.locals.projectId}`)
    })
    
    return router

}
