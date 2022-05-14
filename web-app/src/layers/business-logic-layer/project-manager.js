const projectValidator = require('./project-validator')

module.exports = ({projectRepository}) => {

    return {

        async createProject(project) {

            try {
                const errors = projectValidator.getErrorsNewProject(project)

                if (errors.length > 0) throw errors

                return await projectRepository.createProject(project)

            } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ['Ett oväntat fel inträffade när projektet skulle skapas']
                }
                throw errors
            }

        },
            
        async getAllProjectsByUserId(userId) {

            try {
                return await projectRepository.getAllProjectsByUserId(userId)

            } catch (errors) {
                throw errors
            }

        },

        async getProjectById(projectId) {

            try {
                return await projectRepository.getProjectById(projectId)

            } catch (errors) {
                throw errors
            }

        },

        async updateProject(project) {

            try {
                const errors = projectValidator.getErrorsNewProject(project)
            
                if (errors.length > 0) throw errors

                const oldProject = await this.getProjectById(project.id)
                project.ownerId = oldProject.ownerId

                if (await this.isProjectOwner(project.ownerId, project.id)) {   
                    return await projectRepository.updateProject(project)
                } else {
                    throw ['Projektet tillhör inte användaren']
                }

            } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ['Projektet kunde inte uppdateras i databasen']
                } else {
                    throw errors
                }
                
            }
        },

        async deleteProject(projectId, performingUserId) {

            try {
                const project = await this.getProjectById(projectId)

                if (await this.isProjectOwner(performingUserId, project.id)) {
                    return await projectRepository.deleteProject(project.id)
                } else {
                    throw ['Du kan endast ta bort projekt du är ägare av']
                }

            } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ['Ett oväntat fel inträffade när projektet skulle tas bort från databasen']
                }
                throw errors
            }
        },

        async isProjectOwner(userId, projectId) {
            try {
                const project = await projectRepository.getProjectById(projectId)
                return project.ownerId == userId

            } catch (errors) {
                throw errors
            }
        },

        async getProjectsSharedWithUser(userId) {

            try{
                return await projectRepository.getProjectsSharedWithUser(userId)
            } catch (errors) {
                throw errors
            }

        },
        
        async giveUserAccessToProject(userActionPerformerId, userId, projectId) {

           try {
                const project = await this.getProjectById(projectId)

                if (project.ownerId == userId) {
                    throw ['Hallå där! Du kan ju inte bjuda in dig själv till projektet...']
                }

                if (project.ownerId != userActionPerformerId) {
                    throw ['Användaren måste äga projektet för att kunna utföra denna åtgärd']
                }

                await projectRepository.giveUserAccessToProject(userId, projectId)

           } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ['Ett oväntat fel inträffade när användaren skulle ges tillgång till projektet']
                }
                throw errors
           }

        },

        async revokeUserAccessToProject(userToRemoveId, performingUserId, projectId) {

            try {
                if ((await this.getProjectById(projectId)).ownerId == performingUserId) {
                    await projectRepository.revokeUserAccessToProject(userToRemoveId, projectId)
                } else {
                    throw ['Endast projektägare kan återkalla behörighet']
                }

            } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ['Kunde inte återkalla användarens behörighet till projektet']
                }
                throw errors
            }

        },

        async getUsersWithAccessToProject(projectId) {

            try{
                return await projectRepository.getUsersWithAccessToProject(projectId)

            } catch (errors) {
                throw errors
            }

        },

        async userHasAccessToProject(userId, projectId) {

            try{
                const usersWithAccess = await this.getUsersWithAccessToProject(projectId)

                const project = await this.getProjectById(projectId)

                if (project.ownerId == userId) return true

                for (const user of usersWithAccess){
                    if (userId == user.id) return true
                }
                
                return false

            } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ['Ett oväntat fel uppstod när användarens tillgång till projektet skulle undersökas']
                }
                throw errors
            }

        }
        
    }

}
