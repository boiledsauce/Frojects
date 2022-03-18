loadProjectPage = async (projectId) => {

    try{

        if (await toolbox.userIsLoggedIn()){

            toolbox.showLoadingIndicator()

            const response = await api.makeCall({
                uri: `/projects/${projectId}`
            })

            if (response.status == 200){
                const project = await response.json()

                const title = document.querySelector('#project-page h1')
                title.innerText = project.name

                toolbox.setTitle(project.name)

                const tasksResponse = await api.makeCall({
                    uri: `/projects/${projectId}/tasks`
                })

                if (tasksResponse.status == 200){

                    const tasks = await tasksResponse.json()

                    const taskList = document.getElementById('project-tasks')

                    taskList.innerHTML = ''

                    for (const task of tasks){
                        const listItem = document.createElement('div')
                        listItem.classList.add('list-group-item')
                        const titleDateDiv = document.createElement('div')
                        titleDateDiv.setAttribute('class', 'd-flex w-100 justify-content-between')
                        const taskTitle = document.createElement('h3')
                        taskTitle.innerText = task.title
                        const dateText = document.createElement('small')
                        dateText.innerText = `${task.createdAt}`
                        titleDateDiv.appendChild(taskTitle)
                        titleDateDiv.appendChild(dateText)
                        listItem.appendChild(titleDateDiv)

                        const description = document.createElement('p')
                        description.innerText = task.description
                        listItem.appendChild(description)
                        taskList.appendChild(listItem)
                    }

                    document.getElementById('update-project-button').setAttribute('href', `/projects/${projectId}/update`)

                } else {
                    toolbox.flashMessage('Projektets uppgifter kunde inte hämtas.')
                }

                toolbox.hideLoadingIndicator()

            } else {
                console.log(await response.json())

                toolbox.flashMessage('Projektet kunde inte hämtas.')
            }


        } else {
            toolbox.flashMessage('Du måste logga in för att få tillgång till projektet')
        }

    } catch (error) {
        console.log(error)
        toolbox.flashMessage('Kunde inte visa projektet')
    }
}