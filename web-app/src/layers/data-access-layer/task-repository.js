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
		},

		async getTaskDeadline(taskId){
			try {
				const deadline = await models.Deadline.findOne({
					where: {
						taskId
					}
				})
				return deadline

			} catch (error) {
				console.error(error)
				throw [`Deadlinen kunde inte hämtas från databasen`]
			}
		},

		async createTaskDeadline(taskId, taskEndingDate){
			try {
				const deadline = await models.Deadline.create({
					taskId,
					deadline: taskEndingDate
				})
				return deadline

			} catch (error) {
				console.error(error)
				throw [`Deadlinen kunde inte skapas`]
			}
		},
		
		async completeTask(taskId) {
			try {
				console.log(taskId)
				const result = await models.Task.update({ isCompleted: true }, {
					where: {
						id: taskId,
					}
				})
				console.log("DB RESULT", result)
				return result
			} catch (error) {
				console.error(error)
				throw [`Tasken kunde inte färdiggöras`]
			}
		}
	}
}
