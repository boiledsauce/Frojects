const taskValidator = require('./task-validator')

module.exports = ({taskRepository}) => {

    return {

        async createTask(task) {
            const errors = taskValidator.getErrorsNewTask(task)

            if (errors.length > 0) {
                throw errors
            }

            try {
                return await taskRepository.createTask(task)
            } catch (errors) {
                throw errors
            }
        },

        async getAllTasksByProjectId(projectId) {
            try {
                return await taskRepository.getAllTasksByProjectId(projectId)
            }
            catch (error) {
                throw ["Dina tasks kunde inte hämtas från databasen"]
            }
        },

        async getTaskById(taskId) {
            try {
                return await taskRepository.getTaskById(taskId)
            }
            catch (error) {
                throw ["Din task kunde inte hämtas från databasen"]
            }
        },

        async getTaskDeadline(taskId) {
            try {
                return await taskRepository.getTaskDeadline(taskId)
            } catch (error) {
                throw ["Din deadline för denna task kunde inte hämtas från databasen"]
            }
        },

        async completeTask(taskId) {
            try {
                return await taskRepository.completeTask(taskId)
            } catch (error) {
                console.log(error)
                throw ["Uppgiften kunde inte klarmarkeras"]
            }
        }
        
    }

}

