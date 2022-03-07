import AbstractView from "./abstractView.js"

export default class Home extends AbstractView {
    constructor() {
        super()
        this.setTitle('Home')
    }

    async getHtml() {
        return `<h1>Hem</h1><p>Detta är hem-sidan</p>`
    }
}