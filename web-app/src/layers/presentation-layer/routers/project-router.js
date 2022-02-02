const express = require("express")

const router = express.Router({mergeParams: true})

const projectManager = require("../../business-logic-layer/project-manager")

router.get('/', async (request, response) => {
    const projects = await projectManager.getAllProjectsByUserId(1)
    const model = { 
        project: projects,
        id: 1
    }
    response.render('project.hbs', model)
})


router.get('/:id/create', (request, response) => {
    const model = {
        id: 1
    }
    response.render('create-project.hbs', model)
})

router.post('/:id/create', async (request, response) => {
    const _ownerId = request.params.id
    const _name = request.body.name
    const _time = "2021-02-02"
    const ret = await projectManager.createProject({name: _name, ownerId: _ownerId, creationDate: _time})
    console.log(ret)

    response.redirect('/project')
})

module.exports = router