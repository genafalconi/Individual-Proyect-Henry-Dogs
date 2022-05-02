const { Router } = require('express');
const { Temperamento } = require('../db');
const axios = require('axios');
const e = require('express');

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const petition = await axios.get('https://api.thedogapi.com/v1/breeds');
        const razasApi = petition.data;
        const tempFro = []

        await razasApi.forEach(elem => {
            if(elem.temperament){
                const tempSep = elem.temperament.split(', ')
                tempFro.push(tempSep)
            }
        })
        let allTemp = [].concat(...tempFro)
        let filterTemp = allTemp.filter((val, ind) => {
            return allTemp.indexOf(val) === ind;
        })

        await filterTemp.forEach(elem => {
            Temperamento.create({
                nameTemp: elem
            })
        })
        if (filterTemp.length) return res.json(filterTemp);
        else return res.json({error: 'Error de carga'});
    } catch (error) {
        next(error)
    }
})

/*
Si pasa cualquier valor a la función next() (excepto la serie 'route'), Express considera que la solicitud actual tiene un error y omitirá las restantes funciones de middleware y direccionamiento que no son de manejo de errores.
*/

module.exports = router;