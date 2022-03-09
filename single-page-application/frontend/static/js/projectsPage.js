loadProjectsPage = async () => {
    const AuthResponse = await fetch('http://localhost:3000/api/tokens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        body: 'grant_type=password&username=matts@svinarp.se&password=test123'
    })

    const data = await AuthResponse.json()
    console.log("Svar från API: ", data.accessToken)

    const resourceResponse = await fetch('http://localhost:3000/api/projects/1', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${data.accessToken}`,
            'Accept': 'application/json'
        }
    })

    if (resourceResponse.status == 200){
        const resource = await resourceResponse.json()

        console.log("Resource:", resource)
    } else {
        console.log("Felkod:", resourceResponse.status)
    }

}
