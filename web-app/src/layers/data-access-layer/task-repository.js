const { models } = require('./db')

module.exports = () => {

	return {

		async createTask(title, projectId, description, creationDate){
			try {
				const task = await models.Task.create({
					title,
					projectId,
					description,
					creationDate
				})

				return task.id

			} catch (error) {
				console.error(error)
				throw ['Kunde inte skapa uppgiften i databasen']
			}
		},

		async deleteTask(taskId){
			try {
				models.Task.destroy({
					where: {
						Id: taskId
					}
				})
			}
			catch (error) {
				console.error(error)
				throw error
			}
		},

		async getAllTasksByProjectId(projectId){
			try {
				const tasks = await models.Task.findAll({
					where: {
						projectId: projectId
					}
				})
				return tasks

			} catch (error) {
				console.error(error)
				throw error
			}
		},

		async getTaskById(taskId){
			try {
				const task = await models.Task.findOne({
					where: {
						id: taskId
					}
				})
				return task

			} catch (error) {
				console.error(error)
				throw [`Uppgiften kunde inte hämtas från databasen`]
			}
		}
	}
}
