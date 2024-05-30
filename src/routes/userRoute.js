const express = require('express');
const {listUsers, createUser, editUser, deleteUser, getUser, findAllActiveUsers, findAllInactiveUsers} = require('../controllers/userControl');
const { verifyUsernameLenght, isValidEmail, isValidStatus, userExists, isValidPassword} = require('../middlewares/user/User_InputValidation');
const verifyToken = require('../middlewares/verifyToken');
const passHash = require('../middlewares/PassHash');
const userRoute = express.Router()

userRoute.get("/allactive", verifyToken, findAllActiveUsers);
userRoute.get("/allinactive", verifyToken, findAllInactiveUsers);
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