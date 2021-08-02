const form = document.getElementById('form')
const empresa = document.getElementById("empresa_nombre");
const password = document.getElementById("password_empresa");
const btn_registro = document.getElementById("btn_registro");
const parrafo = document.getElementById("warnings");

// alerta
btn_registro.addEventListener('click', async () => {

    if (empresa.value === "" || password.value === "") {
        // alert('Todos los datos son obligatorios');
        Swal.fire({
            title: 'Atención',
            text: 'Todos los campos son obligatorios',
            icon: 'warning',
            confirmButtonText: 'Cerrar'
        })
        return;
    }

    try {
        const url = `https://localhost:5001/Empresa/${empresa.value}&${password.value}`
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }
        })

        const data = await res.json();
        if (data) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Credenciales correctas',
                text:"Redirigiendo...",
                showConfirmButton: false,
                timer: 1500
              })
              console.log(data)
              localStorage.setItem('id_empresa', data.id);
              localStorage.setItem('nombre_empresa', data.nomEmpresa );
              
              setTimeout(() => {
                  window.location.href ="../html/lista.html"
              }, 1490);

        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Error en el usuario y/o contraseña',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        })
    }

})

