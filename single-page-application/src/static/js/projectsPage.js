loadProjectsPage = async () => {

    try{
        toolbox.setTitle('Projekt')

        if (await toolbox.userIsLoggedIn()){

            toolbox.showLoadingIndicator()
            const response = await api.makeCall({
                uri: '/projects'
            })

            if (response.status == 200){
                const data = await response.json()

                const list = document.getElementById('your-projects')
                list.innerHTML = ''

                for (const project of data.projects){
                    const listItem = document.createElement('a')
                    listItem.classList.add('list-group-item', 'list-group-item-action')
                    listItem.setAttribute('href', `/projects/${project.id}`)
                    listItem.innerText = project.name
                    list.appendChild(listItem)
                }

            }
            else {
                toolbox.flashMessage('Kunde ej hämta projekt')
            }

            toolbox.hideLoadingIndicator()

        } else {
            toolbox.flashMessage('Du måste logga in för att få tillgång till dina projekt')
        }

    } catch (error) {
        console.log("Ett fel uppstod:", error)
    }

}
