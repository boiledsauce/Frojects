const validator = require('validator')

const MIN_TASK_TITLE_LENGTH = 3
const MAX_TASK_TITLE_LENGTH = 15

const MIN_TASK_DESCRIPTION_LENGTH = 8
const MAX_TASK_DESCRIPTION_LENGTH = 1000

exports.getErrorsNewTask = (task) => {
    const errors = []
    
    //Validate firstName
    if (validator.isEmpty(task.title)){
        errors.push('Titel saknas')
    }

    if (!validator.isLength(task.title, {min: MIN_TASK_TITLE_LENGTH, max: MAX_TASK_TITLE_LENGTH}))
    {
        errors.push(`Uppgiftens namn måste vara mellan ${MIN_TASK_TITLE_LENGTH} och ${MAX_TASK_TITLE_LENGTH}`)
    }

    if (validator.isEmpty(task.description)){
        errors.push('Beskrivning saknas')
    }

    if (!validator.isLength(task.description, {min: MIN_TASK_DESCRIPTION_LENGTH, max: MAX_TASK_DESCRIPTION_LENGTH})){
        errors.push(`Uppgiftens beskrivning måste vara mellan ${MIN_TASK_DESCRIPTION_LENGTH} och ${MAX_TASK_DESCRIPTION_LENGTH}`)
    }

    if (!validator.isDate(task.date)){
        errors.push(`Välj ett datum`)
    }

    else if (!validator.isAfter(task.date)){
        errors.push(`Välj ett datum som ligger i framtiden`)
    }

    return errors
}