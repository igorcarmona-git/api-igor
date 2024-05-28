const express = require('express');
const {doLogin} = require('../controllers/loginControl');
const loginRoute = express.Router();

// não pode passar o hash do password para o login
loginRoute.post('/', doLogin);

module.exports = loginRoute