const commentValidator = require('./comment-validator')
isCommentAuthorOwned = async (authorId, userId) => authorId == userId

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
                    console.log(comment)
                    comment.isAuthor = isCommentAuthorOwned(comment.authorId, userId)
                })
                return comments
            } catch (error) {
                console.log(error)
                throw ["Kommentarerna kunde inte hämtas från databasen"]
            }
        },

        async deleteComment(comment, userId) {
            if (comment.authorId != userId) {
                throw ["Behörighet saknas för att ta bort kommentaren"]
            }
        }

    }

}

