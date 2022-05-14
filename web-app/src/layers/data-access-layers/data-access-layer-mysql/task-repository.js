const { db } = require('./db')

module.exports = () => {

	return {

		async createTask(task){ 

			const query = `INSERT INTO Tasks (projectId, title, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`
			
			let createdAt = new Date()
			createdAt.toISOString().split('T')[0]

			const updatedAt = createdAt

            const values = [
                task.projectId, 
                task.title, 
                task.description,
				createdAt,
				updatedAt
            ]

            return new Promise((resolve, reject) => {
                db.query(query, values, (error, result) => {
                    if (error) reject(['Uppgiften kunde inte skapas'])
					console.log(result)
					resolve(result.insertId)
				})
			})

		},

		async deleteTask(taskId){

			const query = `DELETE FROM Tasks WHERE id = ?`
			const values = [
				taskId
			]

            return new Promise((resolve, reject) => {
                db.query(query, values, (error, result) => {
                    if (error) reject(['Uppgiften kunde inte tas bort'])
					resolve(result)
				})
			})

        },

		async getAllTasksByProjectId(projectId){

			const query = `SELECT * FROM Tasks WHERE projectId = ?`

			const values = [ projectId ]

            return new Promise((resolve, reject) => {
                db.query(query, values, (error, result) => {
                    if (error) reject(['Tasksen kunde inte hämtas från databasen'])
					resolve(result)
				})
			})

        },

		async getTaskById(taskId){
			
			const query = `SELECT t.*, d.deadline FROM Tasks AS t LEFT JOIN Deadlines as d ON d.taskId = t.id WHERE t.id = ?`
			
			const values = [ taskId ]

            return new Promise((resolve, reject) => {
                db.query(query, values, (error, task) => {
                    if (error) reject(['Uppgiften kunde inte hämtas'])
					resolve(task[0])
				})
			})

        },

		async getTaskDeadline(taskId){

			const query = `SELECT * FROM Deadlines WHERE taskId = ?`

			const values = [ taskId ]

            return new Promise((resolve, reject) => {
                db.query(query, values, (error, deadline) => {
                    if (error) reject(['Uppgiftens deadline kunde inte hämtas'])				
					resolve(deadline[0])
				})
			})

		},

		async createTaskDeadline(taskId, taskEndingDate){
			
			const query = `INSERT INTO Deadlines (taskId, deadline, createdAt, updatedAt) VALUES (?, ?, ?, ?)`
			
			let createdAt = new Date()
			createdAt.toISOString().split('T')[0]

			const updatedAt = createdAt

			const values = [
				taskId,
				taskEndingDate,
				createdAt,
				updatedAt
			]

            return new Promise((resolve, reject) => {
                db.query(query, values, (error, result) => {
                    if (error) reject(['Deadline kunde inte skapas'])
					resolve(result.insertId)
				})
			})

		},
		
		async completeTask(taskId) {

			const query = `UPDATE Tasks SET isCompleted = true WHERE Tasks.id = ?`

			const values = [ taskId ]

            return new Promise((resolve, reject) => {
                db.query(query, values, (error, result) => {
                    if (error) reject(['Uppgiften kunde inte markeras som avklarad'])
					resolve(result)
				})
			})

		},

		async updateTask(taskId, title, description, deadline) {

			const queryTask = `UPDATE Tasks SET title = ?, description = ? WHERE id = ?`

			const taskValues = [
				title,
				description,
				taskId,
			]

			return new Promise((resolve, reject) => {

				db.beginTransaction((error) => {
					if (error) throw ['Kunde inte påbörja transaktion']
					
					db.query(queryTask, taskValues, (error, resultTask) => {
						
						if (error) {
							console.log(error)
							db.rollback(() => {
								throw ['Kunde inte uppdatera uppgiften']
							})

						} else {
							const queryDeadline = `UPDATE Deadlines SET deadline = ? WHERE taskId = ?`

							const deadlineValues = [deadline, taskId]

							db.query(queryDeadline, deadlineValues, (error, resultDeadline) => {
								if (error) {
									console.log(error)
									throw ['Kunde inte uppdatera deadlinen']
								} else {
									db.commit((error) => {
										if (error) reject(['Internt databasfel'])
										resolve(resultTask)
									})
								}
							})
						}
					})
				})
			})

		},

	}

}
