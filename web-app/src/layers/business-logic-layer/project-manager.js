const projectRepository = require('../data-access-layer/project-repository')

exports.createProject = async (project) => {
    return await projectRepository.createProject(project.name, project.ownerId, project.creationDate)
}

exports.getAllProjectsByUserId = async (userId) => {
    return await projectRepository.getAllProjectsByUserId(userId)
}

exports.getProject = async (projectId) => {
    return await projectRepository.getProject(projectId)
}

exports.createTask = async (task) => {
    return await projectRepository.createTask(task.title, task.projectId, task.description, task.creationDate)
}

exports.getAllTasksByProjectId = async (projectId) => {
    return await projectRepository.getAllTasksByProjectId(projectId)
}
