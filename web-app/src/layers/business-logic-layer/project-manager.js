const projectRepository = require('../data-access-layer/project-repository')
const projectValidator = require('./project-validator')

exports.createProject = async (project) => {
    const errors = projectValidator.getErrorsNewProject(project)

    if (errors.length > 0) {
        return Promise.reject(errors)
    }

    try {
        return await projectRepository.createProject(project.name, project.ownerId, project.creationDate)
    } catch (error) {
        return Promise.reject(["Projektet kunde inte skapas i databasen"])
    }
}

exports.getAllProjectsByUserId = async (userId) => {
    try {
       return await projectRepository.getAllProjectsByUserId(userId)
    } catch (error) {
        return Promise.reject(["Projekten kunde inte hämtas från databasen"])
    }
}

exports.getProject = async (projectId) => {
    try {
        return await projectRepository.getProject(projectId)
    } catch (error) {
        return Promise.reject(["Projektet kunde inte hämtas från databasen"])
    }
}

