const { Router } = require('express');
const { Raza, Temperamento } = require('../db');
const axios = require('axios');

require('dotenv').config();

const { API_KEY } = process.env;

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        // search in api 
        const petition = await axios.get('https://api.thedogapi.com/v1/breeds');
        const razasApi = petition.data;
        // temperaments in db
        const razasDb = await Raza.findAll({ // breeds in the db
            include: Temperamento
        });
        const razasFront = []; // where gonna be the breeds 
        const { name } = req.query; // name from query if exists

        if (name) { // if name exists search in api and db the breed with that name
            razasApi.forEach(elem => {
                if (elem.name.toLowerCase().includes(name.toLowerCase())) {
                    razasFront.push({
                        id: elem.id,
                        name: elem.name,
                        weight: elem.weight.metric,
                        img: elem.image.url,
                        temperament: elem.temperament
                    })
                }
            });
            razasDb.forEach(elem => {
                if (elem.name.toLowerCase().includes(name.toLowerCase())) {
                    razasFront.push({
                        id: elem.id,
                        name: elem.name,
                        weight: elem.weight,
                        img: elem.img,
                        temperaments: elem.temperamentos.temperament.nameTemp
                    })
                }
            });
            if (razasFront.length) return res.json(razasFront);
            else return res.status(404).json({ error: 'No existe ninguna raza con ese nombre' });
        } else { // If name not exists bring all breeds
            razasApi.forEach(elem => {
                razasFront.push({
                    id: elem.id,
                    name: elem.name,
                    weight: elem.weight.metric,
                    img: elem.image.url,
                    temperament: elem.temperament
                })
            });
            if (razasDb) {
                razasDb.forEach(elem => {
                    razasFront.push({
                        id: elem.id,
                        name: elem.name,
                        weight: elem.weight,
                        img: elem.img,
                        temperament: elem.temperamentos[0].nameTemp
                    })
                })

            }
        }
        if (razasFront.length) return res.json(razasFront);
        else return res.status(404).json({ error: 'No hay razas' })
    } catch (error) {
        next(error)
    }
})

router.post('/dog', async (req, res, next) => {
    try {
        const petition = await axios.get('https://api.thedogapi.com/v1/breeds');
        const razasApi = petition.data;
        // temperaments in db
        const razasDb = await Raza.findAll({ // breeds in the db
            include: Temperamento
        });
        const { name, height, weight, lifeSpan, img, temperament } = req.body;
        await razasApi.forEach(elem => {
            if (elem.name.toLowerCase().includes(name.toLowerCase())) {
                return res.status(404).json({ error: 'La raza ya existe' })
            }
        })
        await razasDb.forEach(elem => {
            if (elem.name.toLowerCase().includes(name.toLowerCase())) {
                return res.status(404).json({ error: 'La raza ya existe' })
            }
        })
        const dog = await Raza.create({
            name,
            height,
            weight,
            lifeSpan,
            img,
            temperament
        });

        if (temperament) {
            const temp = temperament.toLowerCase();
            await Temperamento.findOrCreate({
                where: {
                    nameTemp: temp
                }
            })
            const idTempDb = await Temperamento.findAll({
                where: {
                    nameTemp: temp
                }
            })
            const idTemp = [];
            idTempDb.forEach(elem => {
                idTemp.push(elem.dataValues.id);
            })

            await dog.setTemperamentos(idTemp);

            const resp = await Raza.findByPk(dog.dataValues.id, {
                include: Temperamento
            })
            return res.json(resp);
        }
        return res.json({ message: 'Raza creada' })
    } catch (error) {
        next(error);
    }
})

router.get('/:idRaza', async (req, res, next) => {
    try {
        const { idRaza } = req.params;
        const showRaza = [];
        if (idRaza.length < 5 && typeof parseInt(idRaza) === 'number') {
            const petition = await axios.get('https://api.thedogapi.com/v1/breeds');
            const razasApi = petition.data;
            const raza = razasApi.filter(elem => {
                return elem.id === parseInt(idRaza);
            });
            await raza.forEach(elem => {
                showRaza.push({
                    id: elem.id,
                    name: elem.name,
                    height: elem.height.metric,
                    weight: elem.weight.metric,
                    img: elem.image.url,
                    lifeSpan: elem.life_span,
                    temperament: elem.temperament
                });
            })
            if (raza.length) return res.json(showRaza);
            else return res.status(404).json({ error: 'No hay razas' })
        } else {
            const razasDb = await Raza.findByPk(idRaza, {
                include: Temperamento
            })
            showRaza.push({
                id: razasDb.id,
                name: razasDb.name,
                weight: razasDb.weight,
                img: razasDb.img,
                temperament: razasDb.temperamentos[0].nameTemp
            })
            return res.json(showRaza);
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;