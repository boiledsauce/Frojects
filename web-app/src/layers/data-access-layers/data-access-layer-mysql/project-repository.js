const { db } = require('./db')

module.exports = () => {

	return {
		
		async createProject(project){
			try {
				const createdProject = await models.Project.create({
					ownerId: project.ownerId,
					name: project.name
				})
				return createdProject.id

			} catch (error) {
				console.log(error)
				throw ['Kunde inte skapa projekt']
			}
		},

		async giveUserAccessToProject(userId, projectId){
			try{
				await models.UserProjectAccess.create({
					userId,
					projectId
				})

			} catch (error) {
				throw ['Kunde inte ge användaren tillgång till projektet']
			}
		},

		async revokeUserAccessToProject(userId, projectId){
			try{
				return await models.UserProjectAccess.destroy({
					where: {
						projectId,
						userId
					}
				})

			} catch (error) {
				console.log(error)
				throw['Kunde inte återkalla användarens tillgång till projektet']
			}
		},

		async getProjectsSharedWithUser(userId){
			try{
				return await models.Project.findAll({
					include: [{
						model: models.User,
						as: sequelizeConstants.USERS_WITH_ACCESS,
						where: {
							id: userId
						}
					}],
					raw: true,
					nest: true
				})

			} catch (error) {
				console.log(error)
				throw['Kunde inte hämta projekt delade med användaren']
			}
		},
		
		async deleteProject(projectId){
			try {
				models.Project.destroy({
					where: {
						id: projectId
					}
				})

			} catch (error) {
				console.log(error)
				throw ['Kunde inte radera projekt']
			}
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