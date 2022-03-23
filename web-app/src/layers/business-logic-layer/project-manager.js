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
            } catch (errors) {
                throw ["Projektet kunde inte skapas i databasen"]
            }
        },
            
        async getAllProjectsByUserId(userId) {
            try {
                return await projectRepository.getAllProjectsByUserId(userId)
            } catch (errors) {
                console.log(errors)
                throw ["Projekten kunde inte hämtas från databasen"]
            }
        },

        async getProjectById(projectId) {
            try {
                return await projectRepository.getProjectById(projectId)
            } catch (errors) {
                throw ["Projektet kunde inte hämtas från databasen"]
            }
        },

        async updateProject(project) {
            const errors = projectValidator.getErrorsNewProject(project)
            if (errors.length > 0) {
                throw errors
            }

            try {
                const oldProject = await this.getProjectById(project.id)
                project.ownerId = oldProject.ownerId

                if (await this.belongsToUser(project.ownerId, project.id)) {   
                    return await projectRepository.updateProject(project)
                } else {
                    throw ['Projektet tillhör inte användaren']
                }

            } catch (errors) {
                console.log(errors)
                if (errors instanceof Error){
                    throw ["Projektet kunde inte uppdateras i databasen"]
                } else {
                    throw errors
                }
                
            }
        },

        async deleteProject(projectId, performingUserId) {
            try {

                const project = await this.getProjectById(projectId)

                if (await this.belongsToUser(performingUserId, project.id)) {
                    return await projectRepository.deleteProject(project.id)
                }

            } catch (errors) {
                console.log(errors)
                throw ["Projektet kunde inte tas bort från databasen"]
            }
        },

        async belongsToUser(userId, projectId) {
            try {
                const project = await projectRepository.getProjectById(projectId)
                return project.ownerId == userId

            } catch (errors) {
                console.log(errors)
                throw ["Kunde inte kontrollera projektets ägare"]
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
                    throw ["Hallå där! Du kan ju inte bjuda in dig själv till projektet..."]
                }
                if (project.ownerId != userActionPerformerId) {
                    throw ["Användaren måste äga projektet för att kunna utföra denna åtgärd"]
                }

                await projectRepository.giveUserAccessToProject(userId, projectId)
           } catch (errors) {
               console.log(errors)
                throw errors
           }
        },

        async revokeUserAccessToProject(userToRemoveId, performingUserId, projectId) {

            console.log("performer:", performingUserId)
            try {
                if ((await this.getProjectById(projectId)).ownerId == performingUserId) {
                    await projectRepository.revokeUserAccessToProject(userToRemoveId, projectId)
                } else {
                    throw ["Endast projektägare kan återkalla behörighet"]
                } 
            } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ["Kunde inte återkalla behörighet"]
                }
                throw errors
            }

        },

        async getUsersWithAccessToProject(projectId) {
            try{
                return await projectRepository.getUsersWithAccessToProject(projectId)
            } catch (error) {
                throw error
            }
        },

        async userHasAccessToProject(userId, projectId) {
            try{
                const usersWithAccess = await this.getUsersWithAccessToProject(projectId)

                const project = await this.getProjectById(projectId)

                if (project.ownerId == userId){
                    return true
                }

                for (const user in usersWithAccess){
                    if (userId == user.id){
                        return true
                    }
                }
                return false

            } catch (errors) {
                throw errors
            }

        }
        
    }

}
