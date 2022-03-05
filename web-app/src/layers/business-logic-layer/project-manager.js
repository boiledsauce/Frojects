const projectValidator = require('./project-validator')

module.exports = ({projectRepository}) => {

    return {

        async createProject(project) {
            const errors = projectValidator.getErrorsNewProject(project)
            if (errors.length > 0) {
                throw errors
            }

            try {
                return await projectRepository.createProject(project)
            } catch (error) {
                console.log(error)
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

        async getProjectById(projectId) {
            try {
                return await projectRepository.getProjectById(projectId)
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
                const project = await projectRepository.getProjectById(projectId)
                return (project.ownerId == ownerId)

            } catch (error) {
                console.log(error)
                throw ["Kunde inte kontrollera projektets ägare"]
            }
        },
        
        async giveUserAccessToProject(userId, projectId){
            /*TODO
            Check that userId is not same as project.ownerId
            Check that logged un user is project owner 
            */ 
            await projectRepository.giveUserAccessToProject(userId, projectId)
        },

        async revokeUserAccessToProject(userId, projectId){
            /*TODO
            Check so user performing action is project owner
            */
            await projectRepository.revokeUserAccessToProject(userId, projectId)
        },

        async getUsersWithAccessToProject(projectId){
            try{
                return await projectRepository.getUsersWithAccessToProject(projectId)
            } catch (error) {
                throw error
            }
        }
        
    }

}
