const express = require("express")

const router = express.Router({mergeParams: true})

const projectManager = require("../../business-logic-layer/project-manager")

router.get('/', (request, response) => {


    
    const model = { 
        project: projectManager.getAllProjectsByUserId(1)
    }

    response.render('project.hbs', model)
})

router.get('/:id', (request, response) => {
    response.render('project.hbs', model)
})

module.exports = router