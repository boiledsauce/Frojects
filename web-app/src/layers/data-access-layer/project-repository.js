const database = require('./db')

module.exports = function createProjectRepository(){

	return {

		// Get all tasks for a project
		// Get all tasks
		// Get all comments for a task
		// Create a new task
		
		async createProject(name, ownerId, creationDate){
			const query = `INSERT INTO Project (Name, OwnerId, CreationDate) VALUES (?, ?, ?)`
			const values = [name, ownerId, creationDate]
		
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
		
		async deleteProject(projectId){
		
			const query = "DELETE FROM Project WHERE Id = ?"
			const values = [projectId]
		
			return new Promise((resolve, reject) => {
				database.query(query, values, (error) => {
					if (error)
						reject(error)
					else
						resolve(result)
				})
			})
		},
		
		async getAllProjectsByUserId(userId){
			const query = `SELECT * FROM Project WHERE OwnerId = ?`
			const values = [userId]
		
			return new Promise((resolve, reject) => {
				database.query(query, values, (error, projects) => {
					if (error){
						reject(error)
					}
					else {
						resolve(projects)
					}
				})
			})
		},
		
		async getProject(projectId){
			const query = `SELECT * FROM Project WHERE Id = ? LIMIT 1`
			const values = [projectId]
		
			return new Promise((resolve, reject) => {
				database.query(query, values, (error, project) => {
					if (error){
						reject(error)
					}
					else {
						resolve(project)
					}
				})
			})
		}

	}

}