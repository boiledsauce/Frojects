import AbstractView from "./abstractView.js"

export default class Projects extends AbstractView {
    constructor() {
        super()
        this.setTitle('Projects')
    }

    async getHtml() {
        return `<h1>Projekt</h1><p>Detta är projekt-sidan</p>`
    }
}