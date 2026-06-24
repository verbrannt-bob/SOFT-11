const inputNombre = document.getElementById("nombreCertificacion");
const inputFechaVigencia = document.getElementById("vigencia");
const inputInstitucion = document.getElementById("institucion");

const inputDescripcion = document.querySelector("#descripcion");
const btnGuardarCertificacion = document.querySelector("#btnGuardar");

const inputsRequeridos = document.querySelectorAll("input[required]");

const modalExito = new bootstrap.Modal(document.getElementById("successModal"));

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

    // Fecha 
    if (inputFechaVigencia.value.trim() === ""){
        inputFechaVigencia.classList.add("input-error");
    } else{
        inputFechaVigencia.classList.remove("input-error");
    }
}

function registrarCertificacion() {
    //Con sweet alert
    // Swal.fire({
    //     position: "center",
    //     icon: "success",
    //     title: "Certificado Registrado",
    //     showConfirmButton: false,
    //     timer: 1500
    // });

    //con Bootstrap
    modalExito.show();
}


btnGuardarCertificacion.addEventListener("click", validar);