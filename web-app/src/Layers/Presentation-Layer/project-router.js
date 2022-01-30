const express = require('express')
const router = express.Router()


router.get('/', csrfProtection, function (request, response) {
    

})

router.get('/:id', csrfProtection, function (request, response) {
    

})

module.exports = router