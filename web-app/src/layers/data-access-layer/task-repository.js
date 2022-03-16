const { models, sequelizeConstants, sequelize } = require('./db')

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
						id: taskId
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
				return await models.Task.findByPk(taskId, {
					include: 
					{
						attributes: ['deadline'],
						model: models.Deadline,
					},
					raw: true,
					nest: true
				})
				
			} catch (error) {
				console.log(error)
				throw ['Uppgiften kunde inte hämtas från databasen']
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
				console.log(error)
				throw ['Deadlinen kunde inte hämtas från databasen']
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
				console.log(error)
				throw ['Deadlinen kunde inte skapas']
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
				console.log(error)
				throw ['Uppgiften kunde inte klarmarkeras']
			}
		},

		async updateTask(taskId, title, description, deadline) {
			const queryTransaction = await sequelize.transaction()

			try {
				const resultTask = await models.Task.update({ title, description }, {
					where: {
						id: taskId
					},
				})

				const resultDeadline = await models.Deadline.update({ deadline }, {
					where: {
						taskId
					},
				})

				await queryTransaction.commit()
				return resultTask

			} catch (error) {
				console.log(error)
				await queryTransaction.rollback()
				throw ['Uppgiften kunde inte uppdateras']
			}
		},
	}
}
