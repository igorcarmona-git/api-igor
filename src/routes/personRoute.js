const express = require('express');
const {listPeople, createPerson, getPersonByCPF, deletePersonByCPF, editPersonByCPF} = require('../controllers/peopleControl');
const personRoute = express.Router()

personRoute.get("/", listPeople);
personRoute.post('/', createPerson);
personRoute.get('/:cpf', getPersonByCPF);
personRoute.put('/:cpf', editPersonByCPF)
personRoute.delete('/:cpf', deletePersonByCPF)

module.exports = personRoute;