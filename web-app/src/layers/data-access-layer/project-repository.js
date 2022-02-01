const db = require('./db')

// Get all tasks for a project
// Get all tasks
// Get all comments for a task
// Create a new task

exports.createProject = (name, ownerId, creationDate) => {
	const query = `INSERT INTO Project VALUES (Id, Name, OwnerId, CreationDate) 
	VALUES (?, ?, ?)`
    const values = [name, ownerId, creationDate]

	return new Promise((resolve, reject) => {
		db.query(query, values, (error, result) => {
			if (error){
				reject(error)
			}
			else {
				resolve(result)
			}
		})
	})
}

exports.deleteProject = (projectId) => {
	const query = "DELETE FROM Project WHERE Id = ?"
	const values = [projectId]

	return new Promise((resolve, reject) => {[
		db.query(query, values, (error, result) => {
			if (error) {
				reject(error)
			}
			else {
				resolve(result)
			}
		})
	]})
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

exports.createTask = (title, projectId, description, creationDate) => {
	const query = `INSERT INTO Task VALUES (?, ?, ?, ?)`
    const values = [title, projectId, description, creationDate]

	return new Promise((resolve, reject) => {
		db.query(query, values, (error, result) => {
			if (error){
				reject(error)
			}
			else {
				resolve(result)
			}
		})
	})
}


exports.deleteTask = (taskId) => {
	const query = "DELETE FROM Task WHERE Id = ?"
	const values = [projectId]

	return new Promise((resolve, reject) => {[
		db.query(query, values, (error, result) => {
			if (error) {
				reject(error)
			}
			else {
				resolve(result)
			}
		})
	]})
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




