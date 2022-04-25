const { Router } = require('express');
const { Temperamento } = require('../db')

const router = Router();

router.get('/', async (req,res) => {
    return Temperamento.findAll()
    .then((temp) => {
        res.send(temp);
    })
    .catch(err => {res.send(err)})
})

module.exports = router;