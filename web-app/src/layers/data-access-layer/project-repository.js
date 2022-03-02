const { models } = require('./db')

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

			} catch (error){
				console.log(error)
				throw ['Kunde inte ge användaren tillgång till projektet']
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
				const projects = await models.Project.findAll({
					where: {
						ownerId: userId
					}
				})
				return projects
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

		async updateProject(id, name){
			try {
				const project = await models.Project.update({ name }, {
					where: {
						id,
						//ownerId: 4,
						//creationDate: "2012-02-20" 
					}
				})

				return project

			} catch (error) {
				console.error(error)
				throw ['Kunde inte uppdatera projekt']
			}
		},
	}
}