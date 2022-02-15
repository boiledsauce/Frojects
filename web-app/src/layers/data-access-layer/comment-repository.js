const database = require('./db')

module.exports = function createCommentRepository(){

	return {
		async createComment(text, taskId, authorId, creationDate){
			try {
				const comment = await models.Comment.create({
					Text: text,
					TaskId: taskId,
					AuthorId: authorId,
					CreationDate: "2012-11-11"
				})

				return comment
			} catch (error) {
				console.error(error)
				throw error
			}
		},
		
		async getAllCommentsByTaskId(taskId){
			try {
				const comments = await models.Comment.findAll({
					where: {
						TaskId: taskId
					}
				})
			} catch (error) {
				console.error(error)
				throw error
			}
		}
	}
}