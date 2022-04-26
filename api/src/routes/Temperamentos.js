const { Router } = require('express');
const { Temperamento } = require('../db')

const router = Router();

router.get('/', async (req, res, next) => {
    return Temperamento.findAll()
        .then((temp) => {
            res.send(temp);
        })
        .catch(err => { res.send(err) })
})

router.post('/', async (req, res, next) => {
    try {
        const { nombre } = req.body;
        const temper = await Temperamento.create({
            nombre,
        })
        res.json(temper);
    } catch (error) {
        next(error);
    }
    /*
    Si pasa cualquier valor a la función next() (excepto la serie 'route'), Express considera que la solicitud actual tiene un error y omitirá las restantes funciones de middleware y direccionamiento que no son de manejo de errores.
    */
})

module.exports = router;