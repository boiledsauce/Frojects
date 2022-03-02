const { models } = require('./db')

module.exports = () => {

	return {
		
		async createProject(name, ownerId, creationDate){
			try {
				creationDate = "2012-02-20"
				const project = await models.Project.create({
					ownerId,
					name,
					creationDate
				})
				return project

			} catch (error) {
				console.error(error)
				throw ['Kunde inte skapa projekt']
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
				console.error(error)
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
		
		async getProject(projectId){
			try {
				const project = await models.Project.findOne({
					where: {
						id: projectId 
					}
				})

				return project

			} catch (error) {
				console.error(error)
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

				return project.map(it => it.dataValues)

			} catch (error) {
				console.error(error)
				throw ['Kunde inte uppdatera projekt']
			}
		},
	}
}