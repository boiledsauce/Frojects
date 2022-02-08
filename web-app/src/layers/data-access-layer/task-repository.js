const database = require('./db')

exports.createTask = (title, projectId, description, creationDate) => {
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
}


exports.deleteTask = (taskId) => {
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
}

exports.getAllTasksByProjectId = (projectId) => {
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
}

exports.getTaskById = (taskId) => {
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


