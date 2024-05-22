const express = require('express');
const {listPeople, createPerson, getPersonByCPF, deletePersonByCPF, editPersonByCPF} = require('../controllers/peopleControl');
const { verifyNameLenght, isValidEmail, isValidTelefone, isValidStatus, formatDATE, upperCase, cpfExists, formatCPF} = require('../middlewares/inputValidation');
const verifyToken = require('../middlewares/verifyToken');
const personRoute = express.Router()

personRoute.get('/:cpf', verifyToken,getPersonByCPF);
personRoute.put('/:cpf', verifyToken, verifyNameLenght, isValidEmail, isValidTelefone, isValidStatus, formatDATE, formatCPF, upperCase, editPersonByCPF)
personRoute.delete('/:cpf', verifyToken, deletePersonByCPF)
personRoute.get("/", listPeople);
personRoute.post('/', verifyNameLenght, isValidEmail, isValidTelefone, isValidStatus, formatDATE, formatCPF, upperCase, cpfExists, createPerson);

module.exports = personRoute;