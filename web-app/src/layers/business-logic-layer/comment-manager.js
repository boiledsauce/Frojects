const commentValidator = require('./comment-validator')

isCommentAuthorOwned = (authorId, userId) => authorId == userId

module.exports = ({commentMySQLRepository, taskRepository, projectManager}) => {

    return {
        
        async createComment(comment) {
            const errors = commentValidator.getErrorsNewComment(comment)

            if (errors.length > 0) throw errors

            const projectId = (await taskRepository.getTaskById(comment.taskId)).projectId

            if (!(await projectManager.userHasAccessToProject(comment.authorId, projectId))){
                throw ['Du kan endast kommentera i ett projekt som du har tillgång till']
            }
            
            try {
                return await commentMySQLRepository.createComment(comment.text, comment.taskId, comment.authorId, comment.creationDate)
            } catch (error) {
                throw ['Kommentaren kunde inte skapas i databasen']
            }
        },

        
        async getAllCommentsByTaskId(taskId, userId) { 

            const projectId = (await taskRepository.getTaskById(taskId)).projectId

            if (!(await projectManager.userHasAccessToProject(userId, projectId))){
                throw ['Du kan endast se kommentarer i ett projekt som du har tillgång till']
            }

            try {
                const comments = await commentMySQLRepository.getAllCommentsByTaskId(taskId)

                comments.forEach(comment => {
                    comment.isAuthor = isCommentAuthorOwned(comment.authorId, userId)
                })

                return comments

            } catch (error) {
                console.log(error)
                throw ['Kommentarerna kunde inte hämtas från databasen']
            }
        },

        async getCommentById(id) { 
            try {
                return await commentMySQLRepository.getCommentById(id)
            } catch (error) {
                console.log(error)
                throw ['Kommentarerna kunde inte hämtas från databasen']
            }
        },

        async updateComment(comment, userId) { 
            const errors = commentValidator.getErrorsNewComment(comment)
            if (errors.length > 0) {
                throw errors
            }
            try {
                if ((await this.getCommentById(comment.id)).authorId != userId){
                    throw ['Du kan inte uppdatera en kommentar tillhörande en annan användare']
                }
                return await commentMySQLRepository.updateComment(comment.id, userId, comment.text)
            } catch (error) {
                console.log(error)
                throw ['Kommentarerna kunde inte hämtas från databasen']
            }
        },

        async deleteComment(commentId, userId) {
            try {
                const comment = await this.getCommentById(commentId)
                if (comment.authorId != userId) {
                    throw ['Du kan inte ta bort andra användares kommentarer']
                }

                commentMySQLRepository.deleteComment(commentId)
            } catch (error) {
                console.log(error)
                throw ['Kunde inte ta bort kommentaren']
            }
        }

    }

}

