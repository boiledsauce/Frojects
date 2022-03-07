import AbstractView from "./abstractView.js"

export default class Projects extends AbstractView {
    constructor() {
        super()
        this.setTitle('Projects')
    }

    async getHtml() {
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

        const resource = await resourceResponse.json()

        console.log("Resource:", resource)

        return `<h1>Projekt</h1><p>Detta är projekt-sidan</p>`
    }
}