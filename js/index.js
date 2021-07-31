/*ubicacio*/
let ubicationPrincipal = window.pageXOffset; //0

  AOS.init();

/*esconder la barra*/
window.addEventListener("scroll", function(){
    let desplazamientoActual = window.pageYOffset; //medir 100
    if(ubicationPrincipal>=desplazamientoActual){  //0>100
        document.getElementsByTagName("nav")[0].style.top = "0px"
    }else{
        document.getElementsByTagName("nav")[0].style.top = "-100px"
    }
    ubicationPrincipal = desplazamientoActual; // = 100
})

//Menu


