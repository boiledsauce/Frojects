const commentValidator = require('./comment-validator')

isCommentAuthorOwned = (authorId, userId) => authorId == userId

module.exports = ({commentRepository}) => {

    return {
        
        async createComment(comment) {
            const errors = commentValidator.getErrorsNewComment(comment)
            if (errors.length > 0) {
                throw errors
            }
            try {
                return await commentRepository.createComment(comment.text, comment.taskId, comment.authorId, comment.creationDate)
            } catch (error) {
                throw ["Kommentaren kunde inte skapas i databasen"]
            }
        },

        
        async getAllCommentsByTaskId(taskId, userId) { 
            try {
                const comments = await commentRepository.getAllCommentsByTaskId(taskId)

                comments.forEach(comment => {
                    comment.isAuthor = isCommentAuthorOwned(comment.authorId, userId)
                })

                return comments

            } catch (error) {
                console.log(error)
                throw ["Kommentarerna kunde inte hämtas från databasen"]
            }
        },

        async getCommentById(id) { 
            try {
                return await commentRepository.getCommentById(id)
            } catch (error) {
                console.log(error)
                throw ["Kommentarerna kunde inte hämtas från databasen"]
            }
        },

        async updateComment(comment, userId) { 
            const errors = commentValidator.getErrorsNewComment(comment)
            if (errors.length > 0) {
                throw errors
            }
            try {
                if ((await this.getCommentById(comment.id)).authorId != userId){
                    throw ["Du kan uppdatera en kommentar tillhörande en annan användare"]
                }
                return await commentRepository.updateComment(comment.id, userId, comment.text)
            } catch (error) {
                console.log(error)
                throw ["Kommentarerna kunde inte hämtas från databasen"]
            }
        },

        async deleteComment(commentId, userId) {
            try {
                const comment = await this.getCommentById(commentId)
                if (comment.authorId != userId) {
                    throw ["Behörighet saknas för att ta bort kommentaren"]
                }

                commentRepository.deleteComment(commentId)
            } catch (error) {
                console.log(error)
                throw ["Kunde inte ta bort kommentaren"]
            }
        }

    }

}

