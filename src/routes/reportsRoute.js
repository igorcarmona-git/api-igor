const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const findAllDataByUser = require('../controllers/reportsControl/findAllDataByUser');
const reportsRoute = express.Router();

reportsRoute.get('/findAllDataByUser/:username', verifyToken, findAllDataByUser);

module.exports = reportsRoute