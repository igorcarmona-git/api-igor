const express = require('express');
const {doLogin} = require('../controllers/loginControl');
const passHash = require('../middlewares/PassHash');
const {isValidPassword} = require('../middlewares/inputValidation');
const loginRoute = express.Router();

loginRoute.post('/', isValidPassword, passHash, doLogin);

module.exports = loginRoute