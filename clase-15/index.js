const express = require('express')
const app = express()

app.use(express.json())

const mysqlConnetion = require('./conexion')
const { insert_note, remuve_note, update_note, get_note } = require('./operaciones')

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

app.get('/api/note/:id', async (require, response) => {
    const { id } = require.params
    if(!id) {
        return response.status(400).json(
        {
            message: 'Se requieren datos'
        })
    }
    else {
        get_note(mysqlConnetion,
        require.params,
        (result) => {
            response.json(result)
        })     
    }
})

app.post('/api/note', (request, response) => {
    const { titulo, fecha, nota } = request.body

    if(titulo && fecha && nota) {
        insert_note(mysqlConnetion, request.body, (result) => {
            response.json(result)
        })
    }
    else {
        return response.status(400).json({
            message: 'Todos los campos son requeridos'
        })
    }
})

app.put('/api/note', (request, response) => {
    const { titulo, fecha, nota, id } = request.body
    if(titulo && fecha && nota && id) {
        update_note(mysqlConnetion, request.body, (result) => {
            response.json(result)
        })
    }
    else {
        return response.status(400).json({
            message: 'Todos los campos son requeridos'
        })
    }
})

app.delete('/api/note/:id', (request, response) => {
    const { id } = request.params 
    if(!id) {
        return response.status(400).json({
            message: 'Se requieren datos'
        })
    }
    else {
        remuve_note(mysqlConnetion, request.params, (result) => {
            response.json(result)
        })
    }
})


app.listen(3001, () => {
    console.log('Server is running on port 3001')
})