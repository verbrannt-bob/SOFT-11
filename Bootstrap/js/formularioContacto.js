const inputNombre = document.getElementById("nombreCertificacion");
const inputFechaVigencia = document.getElementById("vigencia");
const inputInstitucion = document.getElementById("institucion");
const textAreaConsulta = document.getElementById("descripcion");

const inputDescripcion = document.querySelector("#descripcion");
const btnGuardarCertificacion = document.querySelector("#btnGuardar");

const inputsRequeridos = document.querySelectorAll("input[required], textarea[required]");

function validar() {
    let error = false;
    for (let i = 0; i < inputsRequeridos.length; i++) {
        if (inputsRequeridos[i].value == "") {
            error = true;
            Swal.fire({
                title: "No se puede registrar la certificación",
                text: "Por favor complete los campos resaltados.",
                icon: "warning",
                confirmButtonText: "Aceptar"
            });
        }
    }
    
    resaltarCamposVacios();
    if (error == false) {
        registrarCertificacion();
    }
        
}

function resaltarCamposVacios(){
    //Nombre de la certificaion
    if (inputNombre.value === ""){
        inputNombre.classList.add("input-error");
    } else {
        inputNombre.classList.remove("input-error");
    }

    // Institución 
    if (inputInstitucion.value.trim() === ""){
        inputInstitucion.classList.add("input-error");
    } else{
        inputInstitucion.classList.remove("input-error");
    }


    //Consulta
    if (textAreaConsulta.value.trim() === ""){
        textAreaConsulta.classList.add("input-error");
    } else{
        textAreaConsulta.classList.remove("input-error");
    }
}

function registrarCertificacion() {
    // Con sweet alert
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Consulta enviada",
        showConfirmButton: false,
        timer: 1500
    });
}


btnGuardarCertificacion.addEventListener("click", validar);