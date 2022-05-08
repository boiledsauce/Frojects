const { db } = require('./db')

module.exports = () => {

	return {
		
		async createComment(text, taskId, authorId, creationDate){

			const query = `INSERT INTO Comments (text, taskId, authorId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`

			const updatedAt = creationDate

			const values = [
				text,
				taskId,
				authorId,
				creationDate,
				updatedAt
			]

			return new Promise((resolve, reject) => {
				db.query(query, values, (error, comment) => {
					if (error) {
						console.log(error)
						reject(['Kunde inte skapa kommentar'])
					}
					resolve(comment)
				})
			})
		},
		
		async getAllCommentsByTaskId(taskId){
<<<<<<< HEAD
			try {
				const values = [
					taskId
				]

				const query = `SELECT * FROM Comments AS c JOIN Users AS u ON u.id = c.authorId WHERE c.taskId = ? ORDER BY c.createdAt DESC`

				return new Promise((resolve, reject) => {
					db.query(query, values, (error, comments) => {
						if (error) {
							console.log(error)
							reject(['Kunde inte hämta kommentar'])
						}
						console.log(comments)
						resolve(comments)
=======

			const query = `SELECT C.id, C.text, C.createdAt, C.updatedAt, C.taskId, C.authorId, U.firstName, U.lastName 
							FROM Comments AS C JOIN Users AS U ON U.id = C.authorId WHERE C.taskId = ? 
							ORDER BY C.createdAt DESC`

			const values = [
				taskId
			]

			return new Promise((resolve, reject) => {
				db.query(query, values, (error, comments) => {
					if (error) {
						console.log(error)
						reject(['Kunde inte hämta kommentar'])
					}

					//Make data structure equivalent to the one returned by Sequelize
					comments.forEach(comment => {
						comment.User = {}
						comment.User.firstName = comment.firstName
						comment.User.lastName = comment.lastName
>>>>>>> cfa0744afb241607dc893aa708a64bb4bab0447e
					})

					resolve(comments)
				})
			})

		},

		async getCommentById(id){

			const query = `SELECT * FROM Comments WHERE id = ?`

			const values = [
				id
			]

			return new Promise((resolve, reject) => {
				db.query(query, values, (error, comments) => {
					if (error) reject(['Kunde inte hämta kommentaren'])
					if (comments.length) resolve (comments[0])
					reject(['Ingen kommentar med angivet ID hittades'])
				})
			})
		
		},

		async deleteComment(commentId) {

			const query = `DELETE FROM Comments WHERE id = ?`

			const values = [
				commentId
			]

			return new Promise((resolve, reject) => {
				db.query(query, values, (error, result) => {
					if (error) reject(['Kunde inte ta bort kommentar'])
					resolve(result)
				})
			})

		},

		async updateComment(id, authorId, text) {

			const query = `UPDATE Comments SET text = ? WHERE id = ?`
			
			const values = [
				text, id
			]

			return new Promise((resolve, reject) => {
				db.query(query, values, (error, result) => {
					if (error) reject(['Kunde inte uppdatera kommentar'])
					if (result.affectedRows) resolve(result)
					reject(['Ett fel inträffade när kommentaren skulle uppdateras i databasen'])
				})
			})
			
		}
	}
}