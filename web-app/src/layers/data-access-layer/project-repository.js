const { models } = require('./db')

module.exports = function createProjectRepository(){

	return {
		async createProject(name, ownerId, creationDate){
			try {
				creationDate = "2012-02-20"
				const project = await models.Project.create({
					ownerId,
					name,
					creationDate
				})
				console.log(name, ownerId, creationDate)
				const createdId = project.id
				return createdId

			} catch (error) {
				console.error(error)
				throw error
			}
		},
		
		async deleteProject(projectId){
			try {
				models.Project.destroy({
					where: {
						projectId
					}
				})
			} catch (error) {
				console.error(error)
				throw error
			}
		},
		
		async getAllProjectsByUserId(userId){
			try {
				const projects = await models.Project.findAll({
					where: {
						ownerId: userId
					}
				})
				//console.log(projects)
				return projects
			}
			catch (error) {
				console.error(error)
				throw error
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
				throw error
			}
		}
	}
}