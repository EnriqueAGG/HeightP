const form  = document.getElementById('form')
const empresa = document.getElementById("empresa_nombre");
const password = document.getElementById("password_empresa");
const btn_registro = document.getElementById("btn_registro");
const parrafo = document.getElementById("warnings");

// alerta
btn_registro.addEventListener('click', ()=>{

    if (empresa.value === "" || password.value === "") {
        alert('Todos los datos son obligatorios');
        return;
    }

// // localStorage
// form.addEventListener('submit', function(event){
//     event.preventDefault();
//     let users = Array(
//         {
//             empresa: empresa_nombre.value,
//             password: password_empresa.value
//         }
//     )
// });


        // form.addEventListener("submit", e=>{
        //     e.preventDefault()
        //         let warnings =""
        //         if(empresa.value.length<6){
        //             warnings += 'El nombre no es valido'
        //         }
        //         if(password.value.length<8){
        //             warnings += 'campos incompletos'
        //             entrar = true
        //         }

        //     });    
    // localStorage.setItem('us', JSON.stringify(users));
    // location.href="../html/lista.html"
        //hacer le peticion a la API para crear una cuenta
            
        })

