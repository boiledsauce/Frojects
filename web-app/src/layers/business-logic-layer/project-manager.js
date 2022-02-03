projectRepository = require('../data-access-layer/project-repository')

exports.createProject = async (project) => {
    return await projectRepository.createProject(project.name, project.ownerId, project.creationDate)
}

exports.getAllProjectsByUserId = async (userId) => {
    const projects = await projectRepository.getAllProjectsByUserId(userId)
    return projects
}

exports.getProject = async (projectId) => {
    const project = await projectRepository.getProject(projectId)
    return project
}

exports.createTask = async (task) => {
    const result = await projectRepository.createTask(task.title, task.projectId, task.description, task.creationDate)
    return result
}

exports.getAllTasksByProjectId = async (projectId) => {
    const tasks = await projectRepository.getAllTasksByProjectId(projectId)
    return tasks
}
