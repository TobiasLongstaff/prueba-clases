let isEdit = false


const obtenerNotas = async () => {
    try {
        let response = await fetch('http://localhost:3001/api/note')
        let notas = await response.json()
        let template = '';
        notas.map(nota => {
            template += `
                <div class="card-nota">
                    <header class="container-header">
                        <div class="container-titulo">
                            <h3>${nota.titulo}</h3>
                            <div filaid="${nota.id}" class="container-controles">
                                <button
                                    type="button" 
                                    class="btn-control edit"
                                >
                                    <i class="uil uil-pen"></i>
                                </button>
                                <button 
                                    class="btn-control delete"
                                    type="button"
                                >
                                    <i class="uil uil-trash"></i>
                                </button>
                            </div>
                        </div>
                        <p>Fecha: ${nota.fecha}</p>
                    </header>
                    <main>
                        <p>${nota.nota}</p>
                    </main>
                </div>
            `
        })
        const containerNote = document.querySelector('#container-notes')
        containerNote.innerHTML = template
        new Masonry (containerNote , {
            itemSelector: '.card-nota',
            columnWidth: 240,
            gutter: 12,
            transitionDuration: '0.2s',
        })
    }
    catch (e) {
        console.log(e)
    }

    document.querySelector('.delete').addEventListener('click', async (e) => {
        try {
            let element = e.target.parentNode.parentNode
            let filaid = element.getAttribute('filaid')
            let config = {
                method: 'DELETE',
            }
            let res = await fetch(`http://localhost:3001/api/note/${filaid}`, config)
            if(res.ok){
                obtenerNotas()
            }
        }
        catch(error){
            console.log(error)
        }
    })

    document.querySelector('.edit').addEventListener('click', async (e) => {
        try {
            let element = e.target.parentNode.parentNode
            let filaid = element.getAttribute('filaid')
            let response = await fetch(`http://localhost:3001/api/note/${filaid}`)
            let nota = await response.json()
            document.querySelector('#note-id').value = nota[0].id
            document.querySelector('#titulo').value = nota[0].titulo
            document.querySelector('#fecha').value = nota[0].fecha
            document.querySelector('#nota').value = nota[0].nota

            document.querySelector('#title-form').innerHTML = 'Editar Nota'
            showPopup()
            isEdit = true
        } 
        catch (e) {
            console.log(e)    
        }
    })
}

const formNotes = document.querySelector('#form-notes')

formNotes.addEventListener('submit', async (event) => {
    event.preventDefault()
    const noteObj = {
        id: document.querySelector('#note-id').value,
        titulo: document.querySelector('#titulo').value,
        fecha: document.querySelector('#fecha').value,
        nota: document.querySelector('#nota').value
    }

    try {
        let config = {
            method: isEdit ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteObj)
        }
        let res = await fetch('http://localhost:3001/api/note', config)
        if(res.ok){
            obtenerNotas()
        }
    }
    catch(error){
        console.log(error)
    }
    hiddenPopup()
})

const showPopup = () => {
    document.querySelector('.overlay-popup').style.visibility = 'visible'
    formNotes.style.opacity = '1'
}

const hiddenPopup = () => {
    document.querySelector('#title-form').innerHTML = 'Crear Nota'
    document.querySelector('.overlay-popup').style.visibility = 'hidden'
    formNotes.style.opacity = '0'
    formNotes.reset()
    isEdit = false
}

document.querySelector('#btn-popup').addEventListener('click', () => {
    showPopup()
})

document.querySelector('#cerrar-popup').addEventListener('click', () => {
    hiddenPopup()
})

obtenerNotas()