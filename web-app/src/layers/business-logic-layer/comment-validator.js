const validator = require('validator')

const MIN_COMMENT_LENGTH = 3
const MAX_COMMENT_LENGTH = 50

exports.getErrorsNewComment = (comment) => {
    const errors = []

    //Validate firstName
    if (!validator.isLength(comment.text, {min: MIN_COMMENT_LENGTH, max: MAX_COMMENT_LENGTH}))
    {
        errors.push(`Kommentarens innehåll måste vara mellan ${MIN_COMMENT_LENGTH} och ${MAX_COMMENT_LENGTH} tecken`)
    }

    return errors
}
