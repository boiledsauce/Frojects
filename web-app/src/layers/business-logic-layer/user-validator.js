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
    else if (user.firstName.length < MIN_NAME_LENGTH){
        errors.push(`Förnamnet måste ha minst  ${MIN_NAME_LENGTH} bokstäver`)
    } 
    else if (user.firstName.length > MAX_NAME_LENGTH){
        errors.push(`Förnamnet får inte ha fler än ${MAX_NAME_LENGTH} bokstäver`)
    }

    //Validate lastName
    if (!user.lastName){
        errors.push('Efternamn saknas')
    } 
    else if (user.lastName.length < MIN_NAME_LENGTH){
        errors.push(`Efternamnet måste ha minst  ${MIN_NAME_LENGTH} bokstäver`)
    }
    else if (user.lastName.length > MAX_NAME_LENGTH){
        errors.push(`Efternamnet får inte ha fler än ${MAX_NAME_LENGTH} bokstäver`)
    }

    //Validate email
    if (!user.email){
        errors.push('E-post saknas')
    } 
    else if (user.email.length < MIN_EMAIL_LENGTH){
        errors.push(`E-postadressen får inte vara kortare än ${MIN_EMAIL_LENGTH} tecken`)
    } 
    else if (user.email.length > MAX_EMAIL_LENGTH){
        errors.push(`E-postadressen får inte ha fler än ${MAX_EMAIL_LENGTH} tecken`)
    }
    else if (!user.email.includes('@')){
        errors.push(`E-postadressen måste innehålla @-tecknet`)
    } else if (!user.email.includes('.')){
        errors.push(`E-postadressen måste innehålla minst en punkt (.)`)
    }

    //Validate password
    if (!user.password){
        errors.push('Lösenord saknas')
    } 
    else if (user.password.length < MIN_PASSWORD_LENGTH){
        errors.push(`Lösenordet måste ha minst ${MIN_PASSWORD_LENGTH} tecken`)
    } 
    else if (user.password.length > MAX_PASSWORD_LENGTH){
        errors.push(`Lösenordet får inte ha fler än ${MAX_PASSWORD_LENGTH} tecken`)
    }

    //Validate confirm password
    if (!user.confirmPassword){
        errors.push('Bekräftelse av lösenord saknas')
    } 
    else if (user.confirmPassword != user.password) {
        errors.push('Lösenorden matchar inte')
    }

    return errors
} 