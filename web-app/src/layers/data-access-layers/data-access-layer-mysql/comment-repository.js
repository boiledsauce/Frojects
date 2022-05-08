const { db } = require('./db')

module.exports = () => {

	/*  const query = `INSERT INTO Users 
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
			 */
	return {
		
		async createComment(text, taskId, authorId, creationDate){
			try {
				const updatedAt = creationDate
				const values = [
					text,
					taskId,
					authorId,
					creationDate,
					updatedAt,
				]

				const query = `INSERT INTO Comments (text, taskId, authorId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`
				return new Promise((resolve, reject) => {
					db.query(query, values, (error, comment) => {
						if (error) {
							console.log(error)
							reject(['Kunde inte lägga till kommentar'])
						}
						resolve(comment)
					})
				})
			} catch (error) {
				console.error(error)
				throw ['Kunde inte skapa kommentar']
			}
		},
		
		async getAllCommentsByTaskId(taskId){
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
						resolve(comments)
					})
				})
			} catch (error) {
				console.error(error)
				throw ['Kunde inte hämta kommentarer']
			}
			// try {
				

			// 	const comments = await models.Comment.findAll({
			// 		include: [{
			// 			model: models.User,
			// 			attributes: ['firstName', 'lastName'],
			// 		}],
			// 		where: {
			// 			taskId
			// 		},
			// 		order: [['createdAt', 'DESC']],
			// 		raw: true,
			// 		nest: true
			// 	})
			// 	return comments
			// } catch (error) {
			// 	console.log(error)
			// 	throw ['Kunde inte hämta uppgiftens kommentarer']
			// }
		},

		async getCommentById(id){
			try {
				const values = [
					id
				]

				const query = `SELECT * FROM Comments WHERE id = ?`

				return new Promise((resolve, reject) => {
					db.query(query, values, (error, comment) => {
						if (error) {
							reject(['Kunde inte hämta kommentar'])
						}
						resolve(comment[0])
					})
				})
			} catch (error) {
				console.error(error)
				throw ['Kunde inte hämta kommentar']
			}
			// try {
			// 	return await models.Comment.findOne({
			// 		where: {
			// 			id
			// 		}
			// 	})
			// }catch (error){
			// 	throw ["Kommentaren kunde inte hämtas från databasen"]
			// } 
		},

		async deleteComment(commentId) {
			try {
				const values = [
					commentId
				]

				const query = `DELETE FROM Comments WHERE id = ?`

				return new Promise((resolve, reject) => {
					db.query(query, values, (error, result) => {
						if (error) {
							reject(['Kunde inte ta bort kommentar'])
						}
						resolve(result)
					})
				})
			} catch (error) {
				console.error(error)
				throw ['Kunde inte hämta kommentar']
			}


			// await models.Comment.destroy({
			// 	where: {
			// 		id: commentId
			// 	}
			// })
		},

		async updateComment(id, authorId, text) {
			try {
				const values = [
					id,
					authorId,
					text
				]
				const query = `UPDATE Comments SET text = ? WHERE id = ? AND authorId = ?`

				return new Promise((resolve, reject) => {
					db.query(query, values, (error, result) => {
						if (error) {
							reject(['Kunde inte uppdatera kommentar'])
						}
						resolve(result)
					})
				})
			} catch (error) {
				console.error(error)
				throw ['Kunde inte uppdatera kommentar']
			}
			// try {

			// 	return await models.Comment.update({text}, {
			// 		where: {
			// 			id,
			// 			authorId
			// 		}
			// 	})
			// } catch (error){
			// 	throw ["Kommentaren kunde inte hämtas från databasen"]
			// }
		}
	}
}