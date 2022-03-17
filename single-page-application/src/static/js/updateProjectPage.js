loadUpdateProjectPage = async (projectId) => {
    try{
        toolbox.setTitle('Uppdatera projekt')

        if (await toolbox.userIsLoggedIn()){

            const response = await api.makeCall({
                uri: `/projects/${projectId}`
            })

            if (response.status == 200){
                const project = await response.json()

                const nameInputField = document.getElementById('projectName')
                nameInputField.value = project.name

                const form = document.getElementById('update-project-form')
                
                form.addEventListener('submit', (event) => {
                    event.preventDefault()

                    updateProjectFormHandler(projectId, nameInputField.value)
                })

            } else {
                toolbox.flashMessage('Kunde inte hämta projektet')
            }

        } else {
            toolbox.flashMessage('Du måste vara inloggad för att uppdatera projekt')
        }

    } catch (error) {
        console.log(error)
        toolbox.flashMessage('Kunde inte visa formuläret')
    }

}

updateProjectFormHandler = async (projectId, newName) => {

    const response = await api.makeCall({
        uri: `/projects/${projectId}`,
        method: 'PUT',
        bodyParams: {
            id: projectId,
            newName
        }
    })

    if (response.status == 200){
        toolbox.redirect(`/projects/${projectId}`)
        toolbox.flashMessage('Projektet uppdaterades')

    } else {
        const errors = await response.json()

        toolbox.printErrors(errors)
    }

}