const validator = require('validator')

const MIN_NAME_LENGTH = 2
const MAX_NAME_LENGTH = 50


exports.getErrorsNewProject = (project) => {
    const errors = []
    //Validate firstName
    if (validator.isEmpty(project.name)){
        errors.push('Förnamn saknas')
    }

    if (!validator.isLength(project.name, {MIN_NAME_LENGTH, MAX_NAME_LENGTH}))
    {
        errors.push('Projektets namn måste vara mellan '+ MIN_NAME_LENGTH +' och '+ MAX_NAME_LENGTH +'.')
    }

    if (!validator.isAlpha(project.name, ['sv-SE'])){
        errors.push('Projektets namn måste enbart innehålla bokstäver')
    }

    return errors
} 

