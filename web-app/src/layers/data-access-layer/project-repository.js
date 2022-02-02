const db = require('./db')

// Get all tasks for a project
// Get all tasks
// Get all comments for a task
// Create a new task

exports.createProject = (name, ownerId, creationDate) => {
	const query = `INSERT INTO Project (Name, OwnerId, CreationDate) VALUES (?, ?, ?)`
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

exports.getAllProjectsByUserId = (userId) => {
    const query = `SELECT * FROM Project WHERE OwnerId = ?`
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

exports.getProject = (projectId) => {
    const query = `SELECT * FROM Project WHERE Id = ? LIMIT 1`
    const values = [projectId]

    return new Promise((resolve, reject) => {
		db.query(query, values, (error, project) => {
			if (error){
				reject(error)
			}
			else {
				resolve(project)
			}
		})
	})
}

exports.createTask = (title, projectId, description, creationDate) => {
	const query = `INSERT INTO Task (title, projectId, description, creationDate) VALUES (?, ?, ?, ?)`
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

exports.getAllTasksByProjectId = (projectId) => {
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




