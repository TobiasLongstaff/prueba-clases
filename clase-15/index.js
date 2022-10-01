const express = require('express')
const app = express()

app.use(express.json())

const mysqlConnetion = require('./conexion')

app.get('/', (request, response) => {
    return response.json({
        success: "Bienvenido!"
    })
})

app.get('/api/note', (request, response) => {
    mysqlConnetion.query('SELECT * FROM notas', async (error, result) => {
        response.json(result)
    })
})

app.listen(3001, () => {
    console.log('Server is running on port 3001')
})