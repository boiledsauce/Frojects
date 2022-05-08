const DATE_STRING_LENGTH = 10

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
                const tasks = (await taskRepository.getAllTasksByProjectId(projectId)).reverse()
                tasks.forEach((task, index, taskList) => {
                    taskList[index].createdAtFormatted = task.createdAt.toString().substring(0, DATE_STRING_LENGTH)
                })
                return tasks
            }
            catch (error) {
                console.log(error)
                throw ["Dina uppgifter kunde inte hämtas från databasen"]
            }
        },

        async getTaskById(taskId) {
            try {
                const task = await taskRepository.getTaskById(taskId)
                if (task.Deadline) {
                    task.deadlineFormatted = task.Deadline.deadline.substring(0,10)
                } else {
                    task.deadlineFormatted = task.deadline.toString().substring(0,10)
                }
                return task
            }
            catch (error) {
                throw ["Uppgiften kunde inte hämtas från databasen"]
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

