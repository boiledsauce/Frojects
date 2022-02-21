const { models } = require('./db')

module.exports = function createCommentRepository(){

	return {
		async createComment(text, taskId, authorId, creationDate){
			try {
				const comment = await models.Comment.create({
					text,
					taskId,
					authorId,
					creationDate
				})

				return comment.id
			} catch (error) {
				console.error(error)
				throw error
			}
		},
		
		async getAllCommentsByTaskId(taskId){
			try {
				const comments = await models.Comment.findAll({
					where: {
						taskId
					}
				})
				return comments
			} catch (error) {
				console.error(error)
				throw error
			}
		}
	}
}