import AbstractView from "./abstractView"

export class Home extends AbstractView {
    constructor() {
        this.setTitle('Home')
    }

    async getHtml() {
        return `<h1>Hem</h1><p>Detta är hem-sidan</p>`
    }
}