const GRANT_TYPE = 'password'

const API_URL = 'http://localhost:3000/api'

getAccessToken = async () => {
    const AuthResponse = await fetch(`${API_URL}/tokens`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        body: `grant_type=${GRANT_TYPE}&username=matts@svinarp.se&password=test123`
    })

    const data = await AuthResponse.json()
    return data.accessToken
}

loadProjectsPage = async () => {

    const accessToken = await getAccessToken()

    const resourceResponse = await fetch(`${API_URL}/projects/1`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${accessToken}`,
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
