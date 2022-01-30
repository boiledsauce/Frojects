import express from 'express';
import { engine } from 'express-handlebars';

const path = require('path')
const app = express()
const projectRouter = require('./routers/project-router')


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "views"))

app.get('/', (req, res) => {
    res.render('start')
})

app.use('/project', projectRouter)


app.listen(8080, () => {
    console.log("It's up and running")
})