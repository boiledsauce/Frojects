const { models } = require('./db')

module.exports = () => {

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
				throw ['Kunde inte skapa kommentar']
			}
		},
		
		async getAllCommentsByTaskId(taskId){
			try {
				const comments = await models.Comment.findAll({
					include: [{
						model: models.User,
						attributes: ['firstName', 'lastName'],
					}],
					where: {
						taskId
					},
					order: [['createdAt', 'DESC']],
					raw: true,
					nest: true
				})
				return comments
			} catch (error) {
				console.log(error)
				throw ['Kunde inte hämta uppgiftens kommentarer']
			}
		},

		async getCommentById(id){
			try {
				return await models.Comment.findOne({
					where: {
						id
					}
				})
			}catch (error){
				throw ["Kommentaren kunde inte hämtas från databasen"]
			} 
		},

		async deleteComment(commentId) {
			await models.Comment.destroy({
				where: {
					id: commentId
				}
			})
		},

		async updateComment(id, authorId, text) {
			try {
				return await models.Comment.update({text}, {
					where: {
						id,
						authorId
					}
				})
			} catch (error){
				throw ["Kommentaren kunde inte hämtas från databasen"]
			}
		}
	}
}