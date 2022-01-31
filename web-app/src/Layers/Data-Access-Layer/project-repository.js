const db = require('./db')

// Get all tasks for a project
// Get all tasks
// Get all comments for a task
// Create a new task

exports.createProject = (userId, callback) => {
	const query = `SELECT * FROM Project WHERE UserId = ?`
    const values = []
}

exports.getAllProjectsFromUserId = (userId) => {
    const query = `SELECT * FROM Project WHERE UserId = ?`
    const values = []

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


exports.getAllTasksFromProjectId = (id) => {
    

}


