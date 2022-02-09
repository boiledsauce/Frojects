const projectValidator = require('./project-validator')

module.exports = function createCommentManager({commentRepository}){
    return {
        async createComment(comment) {
            //const errors = projectValidator.getErrorsNewProject(project)
        /*
            if (errors.length > 0) {
                return Promise.reject(errors)
            }
        */
            try {
                return await commentRepository.createComment(comment.text, comment.taskId, comment.authorId, comment.creationDate)
            } catch (error) {
                return Promise.reject(["Kommentaren kunde inte skapas i databasen"])
            }
        },
        
        async getAllCommentsByTaskId (taskId) {
            try {
            return await commentRepository.getAllCommentsByTaskId(taskId)
            } catch (error) {
                return Promise.reject(["Kommentarerna kunde inte hämtas från databasen"])
            }
        }
    }
}

