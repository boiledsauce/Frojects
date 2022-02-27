const projectValidator = require('./project-validator')

module.exports = ({projectRepository}) => {

    return {

        async createProject(project) {
            const errors = projectValidator.getErrorsNewProject(project)
            if (errors.length > 0) {
                throw errors
            }

            try {
                return await projectRepository.createProject(project.name, project.ownerId, project.creationDate)
            } catch (error) {
                throw ["Projektet kunde inte skapas i databasen"]
            }
        },
            
        async getAllProjectsByUserId(userId) {
            try {
            return await projectRepository.getAllProjectsByUserId(userId)
            } catch (error) {
                throw ["Projekten kunde inte hämtas från databasen"]
            }
        },

        async getProject(projectId) {
            try {
                return await projectRepository.getProject(projectId)
            } catch (error) {
                throw ["Projektet kunde inte hämtas från databasen"]
            }
        },

        async updateProject(project) {
            try {
                return await projectRepository.updateProject(project.id, project.name)
            } catch (error) {
                throw ["Projektet kunde inte hämtas från databasen"]
            }
        },

        async deleteProject(projectId) {
            try {
                return await projectRepository.deleteProject(projectId)
            } catch (error) {
                throw ["Projektet kunde inte tas bort från databasen"]
            }
        },

        async belongsToUser(ownerId, projectId) {
            try {
                const project = await this.getProject(projectId)
                return (project.ownerId == ownerId)

            } catch (error) {
                console.log(error)
                throw ["Kunde inte kontrollera projektets ägare"]
            }
        }
        
    }

}
