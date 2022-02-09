const projectValidator = require('./project-validator')
const commentRepository = require('../data-access-layer/comment-repository')

exports.createComment = async (comment) => {
    //const errors = projectValidator.getErrorsNewProject(project)
/*
    if (errors.length > 0) {
        return Promise.reject(errors)
    }
*/
console.log
    try {
        return await commentRepository.createComment(comment.text, comment.taskId, comment.creationDate)
    } catch (error) {
        return Promise.reject(["Kommentaren kunde inte skapas i databasen"])
    }
}

exports.getAllCommentsByTaskId = async (taskId) => {
    try {
       return await commentRepository.getAllCommentsByTaskId(taskId)
    } catch (error) {
        return Promise.reject(["Kommentarerna kunde inte hämtas från databasen"])
    }
}

