loadDeleteProjectPage = async (projectId) => {
    try{
        toolbox.setTitle('Ta bort projekt')

        if (await toolbox.userIsLoggedIn()){
            
            toolbox.showLoadingIndicator()

            

        } else {
            toolbox.flashMessage('Du måste vara inloggad för att ta bort ett projekt')
        }

    } catch (error) {
        console.log(error)
        toolbox.flashMessage('Ett problem uppstod')
    }


}