const database = require('./db')

exports.createComment = (text, taskId, creationDate) => {
	const query = `INSERT INTO Comment (title, projectId, description, creationDate) VALUES (?, ?, ?, ?)`
    const values = [text, taskId, creationDate]

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

exports.getAllCommentsByTaskId = (taskId) => {
    const query = `SELECT * FROM Comment WHERE TaskId = ?`
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


