const validator = require('validator')

const MIN_NAME_LENGTH = 2
const MAX_NAME_LENGTH = 50

const MIN_TASK_TITLE_LENGTH = 3
const MAX_TASK_TITLE_LENGTH = 15

const MIN_TASK_DESCRIPTION_LENGTH = 8
const MAX_TASK_DESCRIPTION_LENGTH = 20

exports.getErrorsNewProject = (project) => {
    const errors = []
    //Validate firstName
    if (validator.isEmpty(project.name)){
        errors.push('Förnamn saknas')
    }

    if (!validator.isLength(project.name, {min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH}))
    {
        errors.push('Projektets namn måste vara mellan '+ MIN_NAME_LENGTH +' och '+ MAX_NAME_LENGTH +'.')
    }

    if (!validator.isAlpha(project.name, ['sv-SE'])){
        errors.push('Projektets namn måste enbart innehålla bokstäver')
    }

    return errors
} 

exports.getErrorsNewTask = (task) => {
    const errors = []
    //Validate firstName
    if (validator.isEmpty(task.title)){
        errors.push('Förnamn saknas')
    }

    if (!validator.isLength(task.title, {min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH}))
    {
        errors.push('Uppgiftens namn måste vara mellan '+ MIN_NAME_LENGTH +' och '+ MAX_NAME_LENGTH +'.')
    }

    if (!validator.isAlpha(task.title, ['sv-SE'])){
        errors.push('Uppgiftens namn måste enbart innehålla bokstäver')
    }

    if (validator.isEmpty(task.description)){
        errors.push('Beskrivning saknas')
    }

    if (!validator.isLength(task.description, {min: MIN_TASK_DESCRIPTION_LENGTH, max: MAX_TASK_DESCRIPTION_LENGTH})){
        errors.push('Uppgiftens beskrivning måste vara mellan '+ MIN_TASK_DESCRIPTION_LENGTH + ' och '+ MAX_TASK_DESCRIPTION_LENGTH + '')
    }

    return errors
}


