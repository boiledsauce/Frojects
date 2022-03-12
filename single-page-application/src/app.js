const express = require('express')

const app = express()

app.use(express.static(`${__dirname}/static`))

app.get('*', (request, response) => {
	response.sendFile(`${__dirname}/static/index.html`)
})

const PORT = 4000

app.listen(4000, () => console.log(`Single Page Application started on port ${PORT}`))