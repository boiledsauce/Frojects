const validator = require('validator')

const MIN_NAME_LENGTH = 2
const MAX_NAME_LENGTH = 50

exports.getErrorsNewProject = (project) => {
    const errors = []

    //Validate firstName
    if (validator.isEmpty(project.name)){
        errors.push('Projektnamn saknas')
    }

    //Validate length of name
    if (!validator.isLength(project.name, {min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH})){
        errors.push(`Projektets namn måste vara mellan ${MIN_NAME_LENGTH} och ${MAX_NAME_LENGTH} tecken`)
    }

    return errors
}


