const mysql = require('mysql2')

function insert_note(connection, data, callback) {
    const { titulo, fecha, nota } = data

    let insertQuery = 'INSERT INTO notas (titulo, fecha, nota) VALUES (?, ?, ?)'
    let query = mysql.format(insertQuery, [titulo, fecha, nota])

    connection.query(query, function(error, result) {
        if(error) throw error
        callback(result)
    })
}

function remuve_note(connection, data, callback) {
    let removeQuery = 'DELETE FROM notas WHERE id = ?'
    let query = mysql.format(removeQuery, [data.id])

    connection.query(query, function(error, result) {
        if(error) throw error
        callback(result)
    })
}

function update_note(connection, data, callback) {
    const { id, titulo, fecha, nota } = data

    let updateQuery = 'UPDATE notas SET titulo = ?, fecha = ?, nota = ? WHERE id = ?'
    let query = mysql.format(updateQuery, [titulo, fecha, nota, id])

    connection.query(query, function(error, result) {
        if(error) throw error
        callback(result)
    })
}

function get_note(connection, data, callback) {
    let getQuery = 'SELECT * FROM notas WHERE id = ?'
    let query = mysql.format(getQuery, [data.id])

    connection.query(query, function(error, result) {
        if(error) throw error
        callback(result)
    })
}

module.exports = { insert_note, remuve_note, update_note, get_note }