const { Router } = require('express');
const { Raza } = require('../db');

const router = Router();

router.get('/', async (req, res, next) => {
    return Raza.findAll()
        .then((raza) => {
            res.send(raza);
        })
        .catch((error) => { next(error) })
})

router.post('/', async (req, res, next) => {
    try {
        const { nombre, altura, peso, anios } = req.body;
        const newRaza = await Raza.create({
            nombre,
            altura,
            peso,
            anios
        })
        res.json(newRaza);
    } catch (error) {
        next(error);
    }
})

router.get('/dogs', async (req, res, next) => {
    const { nombre } = req.query.nombre;
    try {
        const dog = await Raza.findAll({
            where: { nombre: nombre }
        })
        res.json(dog);
    } catch (error) {
        next(error);
    }
})

router.get('/dogs/:idRaza', async (req, res, next) => {
    try {
        const { idRaza } = req.params.idRaza;
        const dog = await Raza.findByPk(idRaza);
        res.send(dog);
    } catch (error) {
        next(error);
    }
})

module.exports = router;

// Minuto 30:18