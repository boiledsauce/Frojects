const express = require("express")

const router = express.Router({mergeParams: true})

router.get('/register', async (request, response) => {
    response.render('user/register', {layout: false})
})

module.exports = router