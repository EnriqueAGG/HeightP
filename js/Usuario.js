const empresa = document.getElementById("empresa_nombre");
const password = document.getElementById("password_empresa");
const btn_registro = document.getElementById("btn_registro");


btn_registro.addEventListener('click', ()=>{

    if (empresa.value === "" || password.value === "") {
        alert('Todos los datos son obligatorios');
        return;
    }

    //hacer le peticion a la API para crear una cuenta

})

