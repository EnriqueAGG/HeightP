

document.addEventListener('DOMContentLoaded', ()=>{

    const id_empresa = localStorage.getItem('id_empresa');
    if(!id_empresa){
        window.location = "../index.html"
    }

    alert('Carga de usuario')
})