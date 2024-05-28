const express = require('express');
const {listUsers, createUser, editUser, deleteUser, getUser} = require('../controllers/userControl');
const { verifyUsernameLenght, isValidEmail, isValidStatus, userExists, isValidPassword} = require('../middlewares/inputValidation');
const verifyToken = require('../middlewares/verifyToken');
const passHash = require('../middlewares/PassHash');
const userRoute = express.Router()

userRoute.get('/:username', verifyToken, getUser);

userRoute.put('/:username',
    verifyToken,
    verifyUsernameLenght, 
    isValidPassword, 
    isValidEmail, 
    isValidStatus, 
    passHash,
    editUser
)

userRoute.delete('/:username', verifyToken, deleteUser)

userRoute.get("/", verifyToken, listUsers);

userRoute.post('/', 
    userExists, 
    verifyUsernameLenght, 
    isValidPassword, 
    isValidEmail, 
    isValidStatus, 
    passHash, 
    createUser
);

module.exports = userRoute;