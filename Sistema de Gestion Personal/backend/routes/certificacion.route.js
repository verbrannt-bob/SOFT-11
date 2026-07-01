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

//get todas las certificacion
router.get("/", async(req, res) => {
    try{
        const certificaciones = await Certificacion.find();
        res.json(certificaciones);

    } catch(error) {
        res.status(500).json({mensajeError: "Error al obtener las certificaciones."});
    }
});

// Primeras N certificaciones registradas 
router.get("/primeras/:cantidad", async(req, res) =>{
    try{
        const cantidad = parseInt(req.params.cantidad);

        // Validar cantidad > 0
        if(isNaN(cantidad) || cantidad <= 0){
            res.status(400).json({mensajeError: "La cantidad debe ser mayor a 0."});
        }

        const certificaciones = await Certificacion.find().sort({_id: 1}).limit(cantidad);
        res.json(certificaciones);
    }catch(error){
        res.status(500).json({mensajeError: "Error al obtener las certificaciones."});
    }
});
// http://localhost:3000/certificaciones/primeras/3


router.get("/top-instituciones/:top", async (req, res) => {
    try {
        const top = parseInt(req.params.top); // Convertir el String a un entero

        // Validar si no es un número o no es mayor a 0
        if (isNaN(top) || top <= 0) { 
            return res.status(400).json({msj: "El parámetro top debe ser un número mayor a 0."  });
        }

        /* aggregate(): Realizar operaciones avanzadas sobre los documentos: agrupar, contar, ordenar, calcular promedios, sumar, entre otras 
        $group: Agrupa todos los documentos que tengan el mismo valor en el campo institucion
        $sum: 1: Por cada documento encontrado aumente el contador 
        cantidadCertificaciones: -1: Orden descendente
        */
        const instituciones = await Certificacion.aggregate([
            {
                $group: {
                    _id: "$institucion",
                    cantidadCertificaciones: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    cantidadCertificaciones: -1
                }
            },
            {
                $limit: top
            }
        ]);

        res.json(instituciones);

    } catch (error) {
        res.status(500).json({msj: "Error al obtener el top de instituciones", error});
    }
});

// http://localhost:3000/certificaciones/top-instituciones/1




module.exports = router;