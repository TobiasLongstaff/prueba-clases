const obtenerNotas = () => {
    const containerNote = document.querySelector('#container-notes')
    new Masonry (containerNote , {
        itemSelector: '.card-nota',
        columnWidth: 240,
        gutter: 12,
        transitionDuration: '0.2s',
    })
}

const formNotes = document.querySelector('#form-notes')

formNotes.addEventListener('submit', async (event) => {
    event.preventDefault()

    const noteObj = {
        titulo: document.querySelector('#titulo').value,
        fecha: document.querySelector('#fecha').value,
        nota: document.querySelector('#nota').value
    }

    try {
        let config = {
            method: 'PORT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteObj)
        }
        let res = await fetch('http://localhost:3001/api/note', config)
        if(res.ok){
            alert('Cargado')
        }
    }
    catch(error){
        console.log(error)
    }
})

document.querySelector('#btn-popup').addEventListener('click', () => {
    document.querySelector('.overlay-popup').style.visibility = 'visible'
    formNotes.style.opacity = '1'
})

document.querySelector('#cerrar-popup').addEventListener('click', () => {
    document.querySelector('.overlay-popup').style.visibility = 'hidden'
    formNotes.style.opacity = '0'
    formNotes.reset()
})

obtenerNotas()