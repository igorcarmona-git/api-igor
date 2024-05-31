const express = require('express');
const profileRoute = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { getProfileByUser, createProfile, editProfile} = require('../controllers/profileControl');
const profileValidation = require('../middlewares/profile/Profile_InputValidation');

profileRoute.post('/:username', verifyToken, profileValidation,createProfile);
profileRoute.get('/:username', verifyToken, getProfileByUser);
profileRoute.put('/:username', verifyToken, profileValidation, editProfile);

module.exports = profileRoute