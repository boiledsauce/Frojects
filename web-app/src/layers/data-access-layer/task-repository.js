const database = require('./db')

module.exports = function createTaskRepository(){

	return {

		async createTask(title, projectId, description, creationDate){
			const query = `INSERT INTO Task (title, projectId, description, creationDate) VALUES (?, ?, ?, ?)`
			const values = [title, projectId, description, creationDate]

			return new Promise((resolve, reject) => {
				database.query(query, values, (error, result) => {
					if (error){
						reject(error)
					}
					else {
						resolve(result.insertId)
					}
				})
			})
		},


		async deleteTask(taskId){
			const query = "DELETE FROM Task WHERE Id = ?"
			const values = [taskId]

			return new Promise((resolve, reject) => {[
				database.query(query, values, (error, result) => {
					if (error) {
						reject(error)
					}
					else {
						resolve(result)
					}
				})
			]})
		},

		async getAllTasksByProjectId(projectId){
			const query = `SELECT * FROM Task WHERE ProjectId = ?`
			const values = [projectId]

			return new Promise((resolve, reject) => {
				database.query(query, values, (error, tasks) => {
					if (error) {
						reject(error)
					}
					else {
						resolve(tasks)
					}
				})
			})
		},

		async getTaskById(taskId){
			const query = `SELECT * FROM Task WHERE Id = ?`
			const values = [taskId]

			return new Promise((resolve, reject) => {
				database.query(query, values, (error, tasks) => {
					if (error) {
						reject(error)
					}
					else {
						resolve(tasks)
					}
				})
			})
		}

	}
}


