const db = require('./db')

// Get all tasks for a project
// Get all tasks
// Get all comments for a task
// Create a new task

exports.createProject = (userId) => {
	const query = `INSERT INTO `
    const values = []
}

exports.getAllProjectsFromUserId = (userId) => {
    const query = `SELECT * FROM Project WHERE UserId = ?`
    const values = [userId]

    return new Promise((resolve, reject) => {
		db.query(query, values, (error, projects) => {
			if (error){
				reject(error)
			}
			else {
				resolve(projects)
			}
		})
	})
}

exports.getAllTasksFromProjectId = (projectId) => {
    const query = `SELECT * FROM Task WHERE ProjectId = ?`
    const values = [projectId]

	return new Promise((resolve, reject) => {
		db.query(query, values, (error, tasks) => {
			if (error) {
				reject(error)
			}
			else {
				resolve(tasks)
			}
		})
	})
}

exports.getAllTasksFromProjectId = (projectId) => {
    const query = `SELECT * FROM Task WHERE ProjectId = ?`
    const values = [projectId]

	return new Promise((resolve, reject) => {
		db.query(query, values, (error, tasks) => {
			if (error) {
				reject(error)
			}
			else {
				resolve(tasks)
			}
		})
	})
}




