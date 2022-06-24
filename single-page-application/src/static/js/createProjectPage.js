const loadCreateProjectPage = async () => {
    try{
        toolbox.setTitle('Uppdatera projekt')

        if (await toolbox.userIsLoggedIn()){

            toolbox.activateSubmitButton()

            toolbox.setAttribute('.current-page .btn-cancel', 'href', `/projects`)

            const form = document.querySelector('.current-page form')

            form.addEventListener('submit', (event) => {
                event.preventDefault()

                const projectName = form.elements['newProjectName'].value

                createProjectFormHandler(projectName)

            })

        } else {
            toolbox.flashMessage('Du måste vara inloggad för att skapa projekt')
        }

    } catch (error){
        console.log(error)
        toolbox.flashMessage('Kunde inte visa formuläret')
    }
}

createProjectFormHandler = async (projectName) => {

    toolbox.showLoadingIndicator()
    toolbox.deactiveSubmitButton()

    const response = await api.makeCall({
        uri: '/projects/create',
        method: 'POST',
        bodyParams: {
            name: projectName
        }
    })

    if (response.status == 200){
        await toolbox.activateSubmitButton()

        toolbox.clearErrors()

        const createdProjectId = await response.json()

        hideCurrentPage()
        showPage(`/projects/${createdProjectId}`)

    } else {
        const errors = await response.json()

        toolbox.printErrors(errors)

        toolbox.activateSubmitButton()
    }

    toolbox.hideLoadingIndicator()
}