const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'html')

app.engine('html', require('ejs').renderFile)

//Public folder for static resources.
app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'static')))

app.get('/', (request, response) => {
    response.render(path.resolve(__dirname, 'frontend', 'index.html'))
})

const PORT = 4000

app.listen(4000, () => console.log(`Single Page Application started on port ${PORT}`))