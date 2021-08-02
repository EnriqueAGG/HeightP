const empresa_nombre = document.querySelector('.empresa_nombre');
const tbody = document.querySelector("#tbody");

const nombre_persona = document.getElementById("nombre_persona");
const altura = document.getElementById("altura");
const btn_obtener_altura = document.getElementById("btn_obtener_altura");
const btn_registro_altura = document.getElementById("btn_registro_altura");
const btn_reset = document.getElementById("btn_reset");


const host = "https://localhost:5001"


var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    keyboard: false
})


btn_obtener_altura.addEventListener('click', async()=>{
    btn_obtener_altura.setAttribute('disabled', "true");
    const url = `${host}/Usuario/altura`
    const res = await fetch(url)
    const data = await res.json();
    altura.value = data
    btn_obtener_altura.removeAttribute('disabled')
})

btn_reset.addEventListener('click', () => {
    nombre_persona.value = ""
    altura.value = ""
    btn_registro_altura.textContent = "Crear registro"
    nombre_persona.focus();
})

document.addEventListener('DOMContentLoaded', () => {

    const id_empresa = localStorage.getItem('id_empresa');
    if (!id_empresa) {
        window.location = "../index.html"
        return;
    }

    empresa_nombre.textContent = localStorage.getItem('nombre_empresa');

    traerDatosEmpresa();

})

const traerDatosEmpresa = async () => {
    const url = `${host}/Usuario/Empresa/${localStorage.getItem('id_empresa')}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)

    let html = ""

    data.forEach((j, i) => {
        html += `
        <tr>
            <th>${i + 1}</th>
            <th>${j.nomPersona}</th>
            <th>${j.altura}</th>
            <th class="extender">
                <button id=${j.id}  type="button" class="btn btn-danger w-25 eliminar">Eliminar</button>
                <button id=${j.id}  type="button" class="btn btn-warning w-25 editar">Editar</button>
            </th>
        </tr>
        
        `
    });

    tbody.innerHTML = html;
}

tbody.addEventListener('click', async (e) => {

    if (e.target.classList.contains('editar')) {
        const id = e.target.id;
        const url = `${host}/Usuario/${id}`
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        nombre_persona.value = data.nomPersona;
        altura.value = data.altura;
        btn_registro_altura.textContent = "Editar registro"

        sessionStorage.setItem('editar', id);

        myModal.show();

    }

    if (e.target.classList.contains('eliminar')) {

        Swal.fire({
            title: '¿Esta seguro de que desea eliminar este registro?',
            text: "Si lo elimina no se podra recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
          }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    const id = e.target.id;
                    const url = `${host}/Usuario/${id}`;
        
                    const res = await fetch(url, {
                        method: 'DELETE',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
        
                    if (res.status === 200) {
                        traerDatosEmpresa();
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Operación realizada',
                            text: "Registro eliminado correctamente",
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al eliminar el registro',
                        icon: 'error',
                        confirmButtonText: 'Cerrar'
                    })
                }
            }
          })

        

    }


})

btn_registro_altura.addEventListener('click', () => {
    if (nombre_persona.value === "" || altura.value === "") {
        Swal.fire({
            title: 'Error',
            text: 'Todos los campos son obligatorios',
            icon: 'warning',
            confirmButtonText: 'Cerrar'
        })

        return;
    }

    if (btn_registro_altura.textContent == "Crear registro") {
        CrearRegistro()
    } else {
        const id = sessionStorage.getItem('editar');
        EditarRegistro(id);
    }

})

const EditarRegistro = async (id) => {
    try {
        const url = `${host}/Usuario`
        const body = {
            id,
            nomPersona: nombre_persona.value,
            altura: altura.value,
            idEmpresa: localStorage.getItem('id_empresa')
        }
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = await res.json();

        if (data) {
            myModal.hide();
            traerDatosEmpresa();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Operación realizada',
                text: "Registro actualizado correctamente",
                showConfirmButton: false,
                timer: 1500
            })
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Error al actualizar el registro',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        })
    }
};

const CrearRegistro = async () => {
    try {
        const url = `${host}/Usuario`
        const body = {
            nomPersona: nombre_persona.value,
            altura: altura.value,
            idEmpresa: localStorage.getItem('id_empresa')
        }
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = await res.json();

        if (data) {
            myModal.hide();
            traerDatosEmpresa();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Operación realizada',
                text: "Registro agregado correctamente",
                showConfirmButton: false,
                timer: 1500
            })
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Error en al hacer el registro',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        })
    }
};

const btn_logout = document.querySelector('#btn_logout');
btn_logout.addEventListener('click',()=>{
    localStorage.clear();
    window.location.href = "../index.html";
})