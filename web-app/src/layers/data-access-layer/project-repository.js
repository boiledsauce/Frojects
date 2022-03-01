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
				throw error
			}
		},
	}
}