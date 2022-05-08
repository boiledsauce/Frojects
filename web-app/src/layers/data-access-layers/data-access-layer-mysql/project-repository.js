const { db } = require('./db')

module.exports = () => {

	return {
		
		async createProject(project){

			const query = 'INSERT INTO project (name, ownerId) VALUES (?, ?)'

			const values = [project.name, project.ownerId]

			return new Promise((resolve, reject) => {
				db.query(query, values, (error, project) => {
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
				db.query(query, values, (error, projects) => {
					if (error) reject(['Kunde inte ta bort projektet'])
					resolve(projects)
				})
			})

			/*try {
				models.Project.destroy({
					where: {
						id: projectId
					}
				})

			} catch (error) {
				console.log(error)
				throw ['Kunde inte radera projekt']
			}*/
		},
		
		async getAllProjectsByUserId(userId){
			try {
				return await models.Project.findAll({
					where: {
						ownerId: userId
					}
				})
			}
			catch (error) {
				console.error(error)
				throw ['Kunde inte hämta projekt tillhörande användaren']
			}
		},
		
		async getProjectById(projectId){
			try {
				const project = await models.Project.findOne({
					where: {
						id: projectId 
					}
				})

				return project

			} catch (error) {
				console.log(error)
				throw ['Kunde inte hämta projekt']
			}
		},

		async updateProject(project){

			try {
				 const updateResult = await models.Project.update({ name: project.name }, {
					where: {
						id: project.id
					}
				})

				if (!updateResult[0]){
					throw ['Ingen rad uppdaterades']
				} 

			} catch (errors) {
				if (errors instanceof Error){
					console.log(errors)
					throw ['Kunde inte uppdatera projekt']	
				} else {
					throw errors
				}
			}
		},

		async getUsersWithAccessToProject(projectId){
			try{
				return await models.User.findAll({
					include: [{
						model: models.Project,
						as: sequelizeConstants.ACCESSIBLE_PROJECTS,
						where: {
							id: projectId
						}
					}],
					raw: true,
					nest: true
				})

			} catch (error) {
				console.log(error)
				throw ["Kunde inte hämta användare med tillgång till projektet"]
			}
		}
	}
}