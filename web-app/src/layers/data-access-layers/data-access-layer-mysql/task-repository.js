const { models, sequelizeConstants, sequelize, db } = require('./db')
/*
 const query = `INSERT INTO Users 
                            (firstName, lastName, email, openId, hashedPassword) 
                            VALUES (?, ?, ?, ?, ?)`
            
            const values = [
                user.firstName, 
                user.lastName, 
                user.email, 
                user.openId, 
                user.hashedPassword
            ]

            return new Promise((resolve, reject) => {
                db.query(query, values, (error, user) => {
                    if (error) {
                        if (error.parent.code == 'ER_DUP_ENTRY'){
                            reject(['Det finns redan en användare med denna e-post'])
                        }
                        console.log(error.parent)
                        reject(['Kunde inte skapa användaren i databasen'])
                    }

                    resolve(user)
                })
            })
        
        },

*/
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
                    if (error) {
						console.log(error)
						reject(['Tasken kunde inte skapas'])
					}
						resolve(result.inserted)
				})
			})
		},
		// 	try {
		// 		const createdTask = await models.Task.create({
		// 			projectId: task.projectId,
		// 			title: task.title,
		// 			description: task.description,
		// 		})
		// 		return createdTask.id

		// 	} catch (error) {
		// 		console.error(error)
		// 		throw ['Kunde inte skapa uppgiften i databasen']
		// 	}
		// },

		async deleteTask(taskId){
			const query = `DELETE FROM Tasks WHERE id = ?`
			const values = [
				taskId
			]

            return new Promise((resolve, reject) => {
                db.query(query, values, (error, result) => {
                    if (error) {
						reject(['Tasken kunde inte tas bort'])
					}
					resolve(result)
				})
			})
        },

		async getAllTasksByProjectId(projectId){
			const query = `SELECT * FROM Tasks WHERE projectId = ?`
			const values = [
				projectId
			]

            return new Promise((resolve, reject) => {
                db.query(query, values, (error, result) => {
                    if (error) {
						console.log("ERROR", error)
						reject(['Tasksen kunde inte hämtas från databasen'])
					}
					resolve(result)
				})
			})
        },
			// try {
			// 	const tasks = await models.Task.findAll({
			// 		where: {
			// 			projectId: projectId
			// 		},
			// 	})
			// 	return tasks

			// } catch (error) {
			// 	console.error(error)
			// 	throw ['Kunde inte hämta projektets uppgifter']
			// }

		async getTaskById(taskId){
			
			const query = `SELECT t.*, d.deadline FROM Tasks AS t LEFT JOIN Deadlines as d ON d.taskId = t.id WHERE t.id = ?`
			const values = [
				taskId
			]

            return new Promise((resolve, reject) => {
                db.query(query, values, (error, task) => {
                    if (error) {
						reject(['Tasken kunde inte hämtas'])
					}
					console.log(task)
					resolve(task[0])
				})
			})
        },

		async getTaskDeadline(taskId){
			const query = `SELECT * FROM Deadlines WHERE taskId = ?`
			const values = [
				taskId
			]

            return new Promise((resolve, reject) => {
                db.query(query, values, (error, deadline) => {
                    if (error) {
						reject(['Tasken kunde inte hämtas'])
					}
					
					resolve(deadline[0])
				})
			})
		},

		async createTaskDeadline(taskId, taskEndingDate){
			console.log("TASKENDING", taskEndingDate)
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
                    if (error) {
						console.log("ERROR", error)
						reject(['Deadline kunde inte skapas'])
					}
					resolve(result.insertId)
				})
			})
			// try {
			// 	const deadline = await models.Deadline.create({
			// 		taskId: taskId,
			// 		deadline: taskEndingDate
			// 	})
			// 	return deadline

			// } catch (error) {
			// 	console.log(error)
			// 	throw ['Deadlinen kunde inte skapas']
			// }
		},
		
		async completeTask(taskId) {
			const query = `UPDATE Tasks SET isCompleted = true`
			const values = [
			]

            return new Promise((resolve, reject) => {
                db.query(query, (error, result) => {
                    if (error) {
						reject(['Tasken kunde inte markeras som avklarad'])
					}
					resolve(result)
				})
			})
			// try {
			// 	const result = await models.Task.update({ isCompleted: true }, {
			// 		where: {
			// 			id: taskId,
			// 		}
			// 	})
			// 	return result

			// } catch (error) {
			// 	console.log(error)
			// 	throw ['Uppgiften kunde inte klarmarkeras']
			// }
		},

		async updateTask(taskId, title, description, deadline) {
			const queryTask = `UPDATE Tasks SET title = ?, description = ? WHERE taskId = ?`
			const taskValues = [
				title,
				description,
				taskId,
			]
			db.beginTransaction((error) => {
				if (error) {
					throw ['Kunde inte uppdatera tasken']
				}
				 
				db.query(queryTask, taskValues, (error, resultTask) => {
					if (error) {
						db.rollback(() => {
							throw ['Kunde inte uppdatera tasken']
						})
					} else {
						const queryDeadline = `UPDATE Deadline SET deadline = ? WHERE taskId = ?`
						const deadlineValues = [deadline, taskId]

						db.query(queryDeadline, taskValues, (error, resultDeadline) => {
							if (error) {
								throw ['Kunde inte uppdatera deadlinen']
							} else {
								db.commit((error) => {
									return new Promise((resolve, reject) => {
										if (error) {
											reject(['Internt databasfel'])
										}
										resolve(resultTask)
									})
								})
							}
						})
					}
				})
			})
			// const query = `SELECT deadline FROM Deadlines WHERE taskId = ?`
			// const values = [
			// 	taskId
			// ]

            // return new Promise((resolve, reject) => {
            //     db.query(query, values, (error, deadline) => {
            //         if (error) {
			// 			reject(['Tasken kunde inte tas bort'])
			// 		}
			// 		resolve(deadline[0])
			// 	})
			// })
			// const queryTransaction = await sequelize.transaction()
			
			// try {
			// 	const resultTask = await models.Task.update({ title, description }, {
			// 		where: {
			// 			id: taskId
			// 		},
			// 	})

			// 	const resultDeadline = await models.Deadline.update({ deadline }, {
			// 		where: {
			// 			taskId
			// 		},
			// 	})

			// 	await queryTransaction.commit()
			// 	return resultTask

			// } catch (error) {
			// 	console.log(error)
			// 	await queryTransaction.rollback()
			// 	throw ['Uppgiften kunde inte uppdateras']
			// }
		},
	}
}
