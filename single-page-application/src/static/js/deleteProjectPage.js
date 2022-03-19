loadDeleteProjectPage = async (projectId) => {
    try{
        toolbox.setTitle('Ta bort projekt')

        if (await toolbox.userIsLoggedIn()){
            
            toolbox.showLoadingIndicator()
            toolbox.activateSubmitButton()

            toolbox.setAttribute('.current-page .btn-cancel', 'href', `/projects/${projectId}`)

            const response = await api.makeCall({
                uri: `/projects/${projectId}`
            })

            if (response.status == 200){
                const project = await response.json()

                const form = document.querySelector('.current-page form')

                const projectIdField = form.elements['projectId']

                projectIdField.value = project.id

                form.addEventListener('submit', (event) => {
                    event.preventDefault()

                    if (projectIdField.value == project.id){
                        deleteProjectFormHandler(projectIdField.value)
                    } else {
                        toolbox.printErrors(['ProjektId:n matchar ej'])
                        toolbox.activateSubmitButton()
                    }

                })

            } else {
                toolbox.flashMessage('Kunde inte hämta projektet')
            }

            toolbox.hideLoadingIndicator()

        } else {
            toolbox.flashMessage('Du måste vara inloggad för att ta bort ett projekt')
        }

    } catch (error) {
        console.log(error)
        toolbox.flashMessage('Ett problem uppstod')
    }


}

deleteProjectFormHandler = async (projectId) => {

    toolbox.showLoadingIndicator()
    toolbox.deactiveSubmitButton()

    const response = await api.makeCall({
        uri: `/projects/${projectId}`,
        method: 'DELETE',
        bodyParams: {
            id: projectId
        }
    })

    if (response.status == 200){
        
        toolbox.activateSubmitButton()

        toolbox.flashMessage('Projektet togs bort')

        hideCurrentPage()
        showPage('/projects')

    } else {
        const errors = await response.json()

        toolbox.printErrors(errors)

        toolbox.activateSubmitButton()
    }

    toolbox.hideLoadingIndicator()

}