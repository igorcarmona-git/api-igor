const express = require('express');
const {listPeople, createPerson, getPersonByCPF} = require('../controllers/peopleControl');
const personRoute = express.Router()

personRoute.get("/", listPeople);
personRoute.get('/:cpf', getPersonByCPF);
personRoute.post('/', createPerson);

module.exports = personRoute;