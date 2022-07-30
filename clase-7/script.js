// let nombre = 'Juan'
// let apellido = 'Perez'
// let edad = 30
// let fechaNacimiento = '01/01/1990'
// let direccion = 'Calle falsa 123'
// let telefono = '1234567890'

const array = ['Juan', 'Perez', 30, '01/01/1990', 'Calle falsa 123', '1234567890']

const objeto = { nombre: 'Juan', apellido: 'Perez' }

const nombre = [ 
    { nombre: 'Juan', apellido: 'Perez' },
    { nombre: 'pepe', apellido: 'pepe' },
    { nombre: 'juan', apellido: 'perez' },
    { nombre: 'juan', apellido: 'perez' }
]

nombre.push({ nombre: 'juan1', apellido: 'perez1' })

console.log(nombre.map( elemento => elemento.nombre))
