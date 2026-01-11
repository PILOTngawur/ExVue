//import express
const express = require('express')

//init express router
const router = express.Router();

const verifyToken = require('../middlewares/auth');

//import register controller
const registerController = require('../controllers/RegisterController');

const loginController = require('../controllers/LoginController');

const userController = require('../controllers/UserController');



//import validate register
const { validateRegister, validateLogin } = require('../utils/validators/auth');

const { validateUser } = require('../utils/validators/user');

//define route for register
router.post('/register', validateRegister, registerController.register);

//define route for login
router.post('/login',validateLogin, loginController.login);

//findusr
router.get('/admin/users',verifyToken, userController.findUser);

//createusr
router.post('/admin/users',verifyToken, validateUser, userController.createUser);

//findusr
router.get('/admin/users/:id',verifyToken, userController.findUserById);

//update
router.put('/admin/users/:id',verifyToken, validateUser, userController.updateUser);

//delete
router.delete('/admin/users/:id',verifyToken, userController.deleteUser);

//export router
module.exports = router