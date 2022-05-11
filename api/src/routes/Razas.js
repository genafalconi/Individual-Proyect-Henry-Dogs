const { Router } = require('express');
const { Raza, Temperamento } = require('../db');
const axios = require('axios');

require('dotenv').config();

const { API_KEY } = process.env;

const router = Router();

const getApiInfo = async () => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
    const apiData = await apiUrl.data.map(elem => {
        return {
            id: elem.id,
            name: elem.name,
            weight: elem.weight.metric,
            height: elem.height.metric,
            img: elem.image.url,
            lifeSpan: elem.life_span,
            temperament: elem.temperament
        }
    });
    return apiData;
}

const getDbInfo = async () => {
    return await Raza.findAll({
        include: {
            model: Temperamento,
            attributes: ['nameTemp'],
            through: {
                attributes: []
            }
        }
    })
}

const getAllRazas = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}

router.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        let allRazas = await getAllRazas();

        if (name) { // if name exists search in api and db the breed with that name
            let resRazas = await allRazas.filter(elem => elem.name.toLowerCase().includes(name.toLowerCase()));

            res.status(200).json(resRazas);
            // if (resRazas.length) res.status(200).json(resRazas);
            // else return res.status(404).json({ error: 'There is not a breed with that name' });
        } else {
            return res.json(allRazas);
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/dog', async (req, res, next) => {
    try {
        const { name, height_min, height_max, weight_min, weight_max, img, lifeSpan, temperament } = req.body;
        const allRazas = await getAllRazas();

        await allRazas.forEach(elem => {
            if (elem.name.toLowerCase().includes(name.toLowerCase())) {
                return res.status(404).json({ error: 'The breed already exists' })
            }
        })

        const newRaza = await Raza.create({
            name,
            height_min,
            height_max,
            weight_min,
            weight_max,
            img,
            lifeSpan
        });

        let idTemp;
        for (let i = 0; i < temperament.length; i++) {
            try {
                idTemp = await Temperamento.findAll({
                    where: {
                        nameTemp: temperament[i]
                    },
                    attributes: ['id']
                })
                newRaza.addTemperamento(idTemp)
            } catch (error) {
                console.log(error)
            }
        }

        if (newRaza) return res.status(200).json(newRaza);
        else return res.json({ message: 'Error creating breed' })
    } catch (error) {
        next(error);
    }
})

router.get('/:idRaza', async (req, res, next) => {
    try {
        const { idRaza } = req.params;
        const allRazas = await getAllRazas();

        if (idRaza) {
            let razaId = await allRazas.filter(elem => elem.id == idRaza)

            console.log(razaId[0])
            if(!razaId[0].temperament) razaId[0].temperament = 'This breed dont have temperaments'
            if (razaId.length) return res.json(razaId)
            else return res.json({ message: 'There is not a breed with that id' });
        } else {
            const razaIdDb = await Raza.findByPk(idRaza, {
                include: {
                    model: Temperamento,
                    attributes: ['nameTemp'],
                    through: {
                        attributes: []
                    }
                }
            })
            if (razaIdDb.length) return res.json(razaIdDb)
            else return res.json({ message: 'There is not a breed with that id' });
        }
    } catch (error) {
        next(error);
    }
});

router.delete('/', async (req, res, next) => {
    console.log('entre')
    try {
        const { idRaza } = req.query;
        console.log(idRaza)
        const allRazas = await getAllRazas();
        if (idRaza) {
            let delRaza = allRazas.filter(elem => elem.id !== idRaza)
            console.log(delRaza)
            res.json(delRaza)
        }
    } catch (error) {
        next(error)
    }


})

module.exports = router;