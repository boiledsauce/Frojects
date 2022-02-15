const {database, models} = require('./db')

module.exports = function createTaskRepository(){
	return {
		async createTask(title, projectId, description, creationDate){
			try {
				const task = await models.Task.create({
					Title: title,
					ProjectId: projectId,
					Description: description,
					CreationDate: creationDate
				})
				const createdId = task.dataValues.Id
				return createdId
			} catch (error) {
				console.error(error)
				throw error
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
						ProjectId: projectId
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
						Id: taskId
					}
				})
				return task
			} catch (error) {
				console.error(error)
				throw error
			}
		}
	}
}
