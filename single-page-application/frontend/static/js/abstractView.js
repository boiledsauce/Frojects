export default class AbstractView{
    constructor() {

    }

    static id

    setTitle(title) {
        document.title = title
    }

    async getHtml() {
        return ''
    }
}