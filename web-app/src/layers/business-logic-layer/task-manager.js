const DATE_STRING_LENGTH = 10

const taskValidator = require('./task-validator')

module.exports = ({taskRepository}) => {

    return {

        async createTask(task) {

            try {
                const errors = taskValidator.getErrorsNewTask(task)

                if (errors.length > 0) throw errors

                return await taskRepository.createTask(task)

            } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ['Ett oväntat fel inträffade när uppgiften skulle skapas']
                }
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

            } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ['Ett oväntat fel inträffade när projektets uppgifter skulle hämtas']
                }
                throw errors
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

            } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ['Ett oväntat fel inträffade när uppgiften skulle hämtas']
                }
                throw errors
            }

        },

        async getTaskDeadline(taskId) {

            try {
                return await taskRepository.getTaskDeadline(taskId)
            } catch (errors) {
                throw errors
            }

        },

        async createTaskDeadline(taskId, deadline) {

            try {
                return await taskRepository.createTaskDeadline(taskId, deadline)

            } catch (errors) {
                throw errors
            }

        },
        
        async updateTask(task) {

            try {
                const errors = taskValidator.getErrorsNewTask(task)

                if (errors.length > 0) throw errors

                return await taskRepository.updateTask(task.taskId, task.title, task.description, task.date)

            } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ['Ett oväntat fel inträffade när uppgiften skulle uppdateras']
                }
                throw errors
            }

        },

        async deleteTask(taskId) {

            try {
                return await taskRepository.deleteTask(taskId)

            } catch (errors) {
                throw errors
            }

        },

        async completeTask(taskId) {

            try {
                return await taskRepository.completeTask(taskId)

            } catch (errors) {
                if (errors instanceof Error){
                    console.log(errors)
                    throw ['Ett oväntat fel inträffade när uppgiften skulle klarmarkeras']
                }
                throw errors
            }
            
        }
        
    }

}

