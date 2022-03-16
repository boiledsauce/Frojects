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

        async createTaskDeadline(taskId, deadline) {
            try {
                return await taskRepository.createTaskDeadline(taskId, deadline)
            } catch (error) {
                throw ["Din deadline för denna task kunde inte skapas från databasen"]
            }
        },
        
        async updateTask(task) {
            const errors = taskValidator.getErrorsNewTask(task)
            if (errors.length > 0) {
                throw errors
            }
            try {
                return await taskRepository.updateTask(task.taskId, task.title, task.description, task.date)
            } catch (error) {
                console.log(error)
                throw ["Din task kunde inte uppdateras"]
            }
        },

        async deleteTask(taskId) {
            try {
                return await taskRepository.deleteTask(taskId)
            } catch (error) {
                console.log(error)
                throw ["Din task kunde inte tas bort"]
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

