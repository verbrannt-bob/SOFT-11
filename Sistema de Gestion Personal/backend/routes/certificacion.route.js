const express = require("express");
const router = express.Router();
const Certificacion = require("../models/certificacion.model");

// Guardar una certificacion
router.post("/", async(req, res) =>{
    const{nombre, institucion, vigencia} = req.body;

    try {
        //Validar los campos bligatorios
        if(!nombre || !institucion){
            return res.status(400).jason({mensajeError: "El nombre  de la certificacion y la institucion son obligatorios"});
        }

        //Validar la vigencia
        if(vigencia){
            const{expira, fechaExpiracion} = vigencia;

            //Si expira, la fecha es obligatoria
            if(expira && !fechaExpiracion){
                return res.status(400).jason({mensajeError: "Debe indicar  la fecha  de expiracion"});
            }
        }

        const nuevaCertificacion = new Certificacion(req.body);
        await nuevaCertificacion.save();
        res.status(201).json(nuevaCertificacion);

    } catch (error) {
        return res.status(400).jason({mensajeError: "Error al crear la Certificacion"});
    }
})







module.exports = router;