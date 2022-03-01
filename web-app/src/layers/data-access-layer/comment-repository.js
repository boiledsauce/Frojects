//const { DataTypes } = require('sequelize/types')
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
					order: [['createdAt', 'DESC']],
					raw: true,
					nest: true
				})
				return comments
			} catch (error) {
				console.log("ERROR:", error)
				throw ['Kunde inte hämta uppgiftens kommentarer']
			}
		}
	}
}