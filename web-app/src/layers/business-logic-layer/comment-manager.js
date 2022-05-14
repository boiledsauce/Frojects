const commentValidator = require('./comment-validator')

const isCommentAuthorOwned = (authorId, userId) => authorId == userId

module.exports = ({commentRepository, taskRepository, projectManager}) => {

    const getProjectIdByTaskId = async (taskId) => {
        return (await taskRepository.getTaskById(taskId)).projectId
    }

    return {
        
        async createComment(comment) {
            
            try {
                const errors = commentValidator.getErrorsNewComment(comment)

                if (errors.length > 0) throw errors
    
                const projectId = await getProjectIdByTaskId(comment.taskId)
    
                if (!(await projectManager.userHasAccessToProject(comment.authorId, projectId))){
                    throw ['Du kan endast kommentera i ett projekt som du har tillgång till']
                }

                return await commentRepository.createComment(comment.text, comment.taskId, comment.authorId, comment.creationDate)
            
            } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ['Ett oväntat fel inträffade när kommentaren skulle skapas i databasen']
                }
                throw errors
                
            }

        },
        
        async getAllCommentsByTaskId(taskId, userId) { 

            try {
                const projectId = await getProjectIdByTaskId(taskId)

                if (!(await projectManager.userHasAccessToProject(userId, projectId))){
                    throw ['Du kan endast se kommentarer i ett projekt som du har tillgång till']
                }

                const comments = await commentRepository.getAllCommentsByTaskId(taskId)

                comments.forEach(comment => {
                    comment.isAuthor = isCommentAuthorOwned(comment.authorId, userId)
                })

                return comments.reverse()

            } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ['Ett oväntat fel inträffade när uppgiftens kommentarer skulle hämtas']
                }
                throw errors
            }

        },

        async getCommentById(commentId) { 

            try {
                const comment = await commentRepository.getCommentById(commentId)

                return comment

            } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ['Ett oväntat fel inträffade när kommentaren skulle hämtas']
                }
                throw errors
                
            }

        },

        async updateComment(comment, userId) {
            
            try {

                const errors = commentValidator.getErrorsNewComment(comment)

                if (errors.length > 0) throw errors

                if ((await this.getCommentById(comment.id)).authorId != userId){
                    throw ['Du kan inte uppdatera en kommentar tillhörande en annan användare']
                }
                
                return await commentRepository.updateComment(comment.id, userId, comment.text)

            } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ['Ett oväntat fel inträffade när kommentaren skulle uppdateras']
                }
                throw errors
            }

        },

        async deleteComment(commentId, userId) {

            try {
                const comment = await this.getCommentById(commentId)
                
                if (comment.authorId != userId) {
                    throw ['Du kan inte ta bort andra användares kommentarer']
                }

                commentRepository.deleteComment(commentId)

            } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ['Ett oväntat fel inträffade när kommentaren skulle tas bort']
                }
                throw errors
            }

        }

    }

}

