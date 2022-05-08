const { db } = require('./db')

module.exports = () => {

	return {
		
		async createProject(project){

			const query = 'INSERT INTO Projects (name, ownerId, createdAt, updatedAt) VALUES (?, ?, ?, ?)'

			let createdAt = new Date()
			createdAt.toISOString().split('T')[0]
			
			const updatedAt = createdAt
			const values = [project.name, project.ownerId, createdAt, updatedAt]

			return new Promise((resolve, reject) => {
				db.query(query, values, (error, project) => {
					console.log(error)
					if (error) reject(['Projektet kunde inte skapas i databasen'])
					resolve(project)
				})
			})

		},

		async giveUserAccessToProject(userId, projectId){

			const query = 'INSERT INTO UserProjectAccesses (userId, projectID) VALUES (?, ?)'

			const values = [userId, projectId]

			return new Promise((resolve, reject) => {
				db.query(query, values, (error, result) => {
					if (error) reject(['Kunde inte ge användaren tillgång till projektet'])
					resolve(result)
				})
			})

		},

		async revokeUserAccessToProject(userId, projectId){

			const query = 'DELETE FROM UserProjectAccesses WHERE userId = ? AND projectId = ?'

			const values = [userId, projectId]

			return new Promise((resolve, reject) => {
				db.query(query, values, (error, result) => {
					if (error) reject(['Kunde inte återkalla användarens tillgång till projektet'])
					resolve(result)
				})
			})

		},

		async getProjectsSharedWithUser(userId){

			const query = `SELECT * FROM Projects 
							JOIN UserProjectAccesses AS UPA WHERE UPA.userId = ?`

			const values = [userId]

			return new Promise((resolve, reject) => {
				db.query(query, values, (error, projects) => {
					if (error) reject(['Kunde inte hämta projekt delade med användaren'])
					resolve(projects)
				})
			})

		},
		
		async deleteProject(projectId){

			const query = 'DELETE FROM Projects WHERE id = ?'

			const values = [projectId]

			return new Promise((resolve, reject) => {
				db.query(query, values, (error, result) => {
					if (error) reject(['Kunde inte ta bort projektet'])
					if (result.affectedRows) resolve(result)
					reject(['Ett oväntat fel inträffade när projektet skulle tas bort'])
				})
			})

		},
		
		async getAllProjectsByUserId(userId){

			const query = 'SELECT * FROM Projects WHERE ownerId = ?'

			const values = [userId]

			return new Promise((resolve, reject) => {
				db.query(query, values, (error, projects) => {
					if (error) reject(['Kunde inte hämta projekt tillhörande användaren'])
					resolve(projects)
				})
			})

		},
		
		async getProjectById(projectId){

			const query = 'SELECT * FROM Projects WHERE id = ?'

			const values = [projectId]

			return new Promise((resolve, reject) => {
				db.query(query, values, (error, projects) => {
					if (error) reject(['Ett fel inträffade när projektet skulle hämtas utifrån ID'])
					if (projects.length) resolve(projects[0])
					reject(['Inget projekt med angivet ID hittades'])
				})
			})

		},

		async updateProject(project){

			const query = `UPDATE Projects SET name = ? WHERE id = ?`

			const values = [project.name, project.id]

			return new Promise((resolve, reject) => {
				db.query(query, values, (error, result) => {
					if (error) reject(['Ett fel inträffade när projektet skulle uppdateras'])
					if (result.affectedRows) resolve(result)
					reject(['Inget projekt uppdaterades'])
				})
			})

		},

		async getUsersWithAccessToProject(projectId){

			const query = `SELECT U.* FROM Users AS U JOIN UserProjectAccesses AS UPA ON 
							U.id = UPA.userId WHERE UPA.projectId = ?`

			const values = [projectId]

			return new Promise((resolve, reject) => {
				db.query(query, values, (error, users) => {
					if (error) reject(['Kunde inte hämta användare med tillgång till projektet'])
					resolve(users)
				})
			})

		}

	}

}