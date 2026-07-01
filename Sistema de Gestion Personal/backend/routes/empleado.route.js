const express = require("express");
const router = express.Router();
const Empleado = require("../models/empleado.model");

router.post("/", async (req, res) => {

    const { nombre, correo, contrasenna, direccion } = req.body;

    // Validar los campos obligatorios 
    if (!nombre || !correo || !contrasenna || !direccion) {
        return res.status(400).json({ mensajeError: "Todos los datos son obligatorios." });
    }

    // Validar los campos aninadados en la dirección
    const { provincia, distrito, canton } = direccion;
    if (!provincia || !distrito || !canton) {
        return res.status(400).json({ mensajeError: "La dirección debe incluir provincia, cantón y distrito." });
    }

    try {
        const nuevoEmpleado = new Empleado({ nombre, correo, contrasenna, direccion });
        await nuevoEmpleado.save();
        res.status(201).json(nuevoEmpleado);
    } catch (error) {
        return res.status(400).json({ mensajeError: "Error al crear el empleado.", error });
    }
});

router.get("/", async (req, res) => {
    try {
        const empleados = await Empleado.find();
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ mensajeError: "Error al obtener los empleados." });
    }
});

router.put("/agregar-certificacion", async(req, res) {
    const {correo, centificacionId} = req.body;

    //validar los campos obligatorios
    if(!correo || !certificacionId){
        return res.status(400).json({ mensajeError: "Correo y id de la certidicacion son obligatorios", error});
    }

    try {

    } catch(error){
        res.status(500).json({msj: "Error al agregar la certificacion al empleado", error});
    }


})

module.exports = router;