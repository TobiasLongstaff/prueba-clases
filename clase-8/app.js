
const form = document.querySelector('#form')

form.addEventListener('submit', async function(event) {
    event.preventDefault()

    const name = document.querySelector('#nombre').value
    const nameFinal = name.toUpperCase()

    const usuario = {
        nombre: nameFinal,
        apellido: document.querySelector('#apellido').value,
        fechaDeNacimiento: document.querySelector('#fecha').value,
    }

    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }
    let response = await fetch('http://localhost:3000/usuarios', config)
    console.log(response)

    console.log(usuario)
})

prueba()

async function prueba() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/1/')
    console.log(response.json())    
}
