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

				const createdId = project.dataValues.Id
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
						id: projectId
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
			}
			catch (error) {
				console.error(error)
				throw error
			}
		},
		
		async getProject(projectId){
			try {
				const project = await models.Project.findOne(projectId)
			} catch (error) {
				console.error(error)
				throw error
			}
		}
	}
}