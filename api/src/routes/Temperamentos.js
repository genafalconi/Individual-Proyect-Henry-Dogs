const { Router } = require('express');
const { Raza, Temperamento } = require('../db');
const axios = require('axios');
const e = require('express');

const router = Router();

const getApiTemp = async () => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
    const apiData = await apiUrl.data.map(elem => {
        return {
            id: elem.id,
            name: elem.name,
            weight: elem.weight.metric,
            img: elem.image.url,
            temperament: elem.temperament
        }
    });
    return apiData;
}

router.get('/', async (req, res, next) => {
    try {
        const razasApi = await getApiTemp();
        const tempFro = []

        const { temperament } = req.query;
        const tempSearch = [];

        await razasApi.forEach(elem => {
            if (elem.temperament) {
                const tempSep = elem.temperament.split(', ')
                tempFro.push(tempSep)
            }
        })
        let allTemp = [].concat(...tempFro)
        let filterTemp = allTemp.filter((val, ind) => {
            return allTemp.indexOf(val) === ind;
        })

        filterTemp.forEach(elem => {
            Temperamento.findOrCreate({
                where: {
                    nameTemp: elem
                }
            })
        })
        if (temperament) {
            razasApi.forEach(elem => {
                if (elem.temperament) {
                    if (elem.temperament.toLowerCase().includes(temperament.toLowerCase())) {
                        tempSearch.push({
                            id: elem.id,
                            name: elem.name,
                            weight: elem.weight,
                            img: elem.img,
                            temperament: elem.temperament
                        })
                    }
                }
            });
            return res.json(tempSearch);
            // if (tempSearch.length) return res.json(tempSearch);
            // else return res.status(404).json({ error: 'No existe ningun temperamento con ese nombre' });
        }

        if (filterTemp.length) return res.json(filterTemp);
        else return res.status(404).json({ error: 'Error de carga' });
    } catch (error) {
        next(error)
    }
})

/*
Si pasa cualquier valor a la función next() (excepto la serie 'route'), Express considera que la solicitud actual tiene un error y omitirá las restantes funciones de middleware y direccionamiento que no son de manejo de errores.
*/

module.exports = router;