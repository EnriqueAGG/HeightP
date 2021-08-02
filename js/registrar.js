
const empresa_registro = document.getElementById("empresa_registro");
const password_registro = document.getElementById("password_registro");
const btn_registro_ = document.getElementById("btn_registro_");

const host = "https://localhost:5001"

btn_registro_.addEventListener('click', async () => {

    if (empresa_registro.value === "" || password_registro.value === "") {
        // alert('Todos los datos son obligatorios');
        Swal.fire({
            title: 'Atención',
            text: 'Todos los campos son obligatorios',
            icon: 'warning',
            confirmButtonText: 'Cerrar'
        })
        return;
    }

    registrarEmpresa();

});

const registrarEmpresa = async () => {
    try {
        const url = `${host}/Usuario`
        const info = {
            nomEmpresa: empresa_registro.value,
            password: password_registro.value
        }
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })

        const data = await res.json();

        if (data) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cuenta creada correctamente',
                text: "Redirigiendo...",
                showConfirmButton: false,
                timer: 1500
            })

            localStorage.setItem('id_empresa', data.id);
            localStorage.setItem('nombre_empresa', data.nomEmpresa );
            setTimeout(() => {
                window.location.href = "../html/lista.html"
            }, 1490);
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Error al crear la cuenta',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        })
    }

};

