const MIN_NAME_LENGTH = 2
const MAX_NAME_LENGTH = 50

const MIN_EMAIL_LENGTH = 7
const MAX_EMAIL_LENGTH = 254

const MIN_PASSWORD_LENGTH = 6
const MAX_PASSWORD_LENGTH = 60

exports.getErrorsNewUser = (user) => {
    
    const errors = []

    //Validate firstName
    if (!user.firstName){
        errors.push('Förnamn saknas')
    }

    //Validate lastName
    if (!user.lastName){
        errors.push('Efternamn saknas')
    }

    //Validate email
    if (!user.email){
        errors.push('E-post saknas')
    }

    //Validate password
    if (!user.password){
        errors.push('Lösenord saknas')
    }

    //Validate confirm password
    if (!user.confirmPassword){
        errors.push('Bekräftelse av lösenord saknas')
    }

    return errors
} 