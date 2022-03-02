const { models } = require('./db')

module.exports = () => {

	return {

		async createTask(task){
			try {
				const createdTask = await models.Task.create({
						projectId: task.projectId,
						title: task.title,
						description: task.description,
				})
				return createdTask.id

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
				throw ['Kunde inte ta bort uppgiften från databasen']
			}
		},

		async getAllTasksByProjectId(projectId){
			try {
				const tasks = await models.Task.findAll({
					where: {
						projectId: projectId
					},
				})
				return tasks

			} catch (error) {
				console.error(error)
				throw ['Kunde inte hämta projektets uppgifter']
			}
		},

		async getTaskById(taskId){
			try {
				const task = await models.Task.findByPk(taskId, {
					include: 
					{
							attributes: ['deadline'],
							model: models.Deadline,
					},
					raw: true,
					nest: true
				})
				console.log(task)
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
						taskId,
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
					taskId: taskId,
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
				const result = await models.Task.update({ isCompleted: true }, {
					where: {
						id: taskId,
					}
				})
				return result

			} catch (error) {
				console.error(error)
				throw [`Uppgiften kunde inte klarmarkeras`]
			}
		}

	}
}
