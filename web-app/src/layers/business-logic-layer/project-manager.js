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
    return await projectRepository.getAllProjectsByUserId(userId)
}

exports.getProject = async (projectId) => {
    return await projectRepository.getProject(projectId)
}

exports.createTask = async (task) => {
    const errors = projectValidator.getErrorsNewTask(task)
    console.log(task)

    if (errors.length > 0) {
        return Promise.reject(errors)
    }

    try {

        return await projectRepository.createTask(task.title, task.projectId, task.description, task.creationDate)
    } catch (error) {

        return Promise.reject(["Din task kunde inte skapas i databasen"])
    }
}

exports.getAllTasksByProjectId = async (projectId) => {
    return await projectRepository.getAllTasksByProjectId(projectId)
}
