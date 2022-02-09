const taskRepository = require('../data-access-layer/task-repository')
const projectValidator = require('./project-validator')
module.exports = function createTaskManager({taskRepository}){
    return {    
        async createTask(task) {
            const errors = projectValidator.getErrorsNewTask(task)
            console.log(task)
            if (errors.length > 0) {
                return Promise.reject(errors)
            }

            try {
                return await taskRepository.createTask(task.title, task.projectId, task.description, task.creationDate)
            } catch (error) {
                return Promise.reject(["Din task kunde inte skapas i databasen"])
            }
        },

        async getAllTasksByProjectId(projectId) {
            try {
                return await taskRepository.getAllTasksByProjectId(projectId)
            }
            catch (error) {
                return Promise.reject(["Dina tasks kunde inte hämtas från databasen"])
            }
        },

        async getTaskById(taskId) {
            try {
                return await taskRepository.getTaskById(taskId)
            }
            catch (error) {
                return Promise.reject(["Din task kunde inte hämtas från databasen"])
            }
        }
    }
}

