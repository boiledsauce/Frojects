const {database, models} = require('./db')
module.exports = function createProjectRepository(){

	return {
		async createProject(name, ownerId, creationDate){
			try {
				const project = await models.Project.create({
					Name: name,
					OwnerId: ownerId,
					CreationDate: "2012-11-11"
				})

				const createdId = project.Id
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
						Id: projectId
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
						OwnerId: userId
					}
				})
				console.log(projects)
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
						Id: projectId 
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