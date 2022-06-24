const GRANT_TYPE = 'password'
const API_URL = 'http://localhost:3000/api'

const DEFAULT_HEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
}

const api = {

    /**
     * 
     * @param {string} uri The endpoint uri
     * @param {string} method The HTTP method
     * @param {object} bodyParams Optional object containing key-value pairs
     * @param {Boolean} includeAuthHeader Indicate whether access token should be used 
     * @returns {response} A response promise
     */
    makeCall: async ({uri, method = 'GET', bodyParams = undefined, includeAuthHeader = true}) => {

        if (!(await toolbox.userIsLoggedIn()) && includeAuthHeader){
            throw ['Du måste logga in för att få tillgång till resurserna på API:n']
        }

        const headers = DEFAULT_HEADERS
        if (includeAuthHeader){
            headers['Authorization'] = `Bearer ${await toolbox.getSavedAccessToken()}`
        }

        const requestOptions = {
            method,
            headers
        }

        if (bodyParams !== undefined){

            const body = await toolbox.generateRequestBody(bodyParams)

            requestOptions.body = body
        }

        return await fetch(`${API_URL}${uri}`, requestOptions)
    }

}