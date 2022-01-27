const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const app = express()

app.engine('hbs', expressHandlebars.engine({
    defaultLayout: 'main.hbs'
}))

app.set('views', path.join(__dirname, "views"))

app.get('/', (req, res) => {
    res.render('start.hbs')
    console.log("hehehe")

})


app.listen(8080, () => {
    console.log("It's up and running")

})