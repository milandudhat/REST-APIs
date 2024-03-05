const express = require('express');
const UserController = require('./controller/user.controller.js');
const validateUserSchemaSignup = require('../../utils/helper.js').validateUserSchemaSignup;
const validateUserSchemalogin = require('../../utils/helper.js').validateUserSchemalogin;

const router = express.Router();

router.post('/signup', validateUserSchemaSignup,  UserController.signup);
router.post('/login', validateUserSchemalogin,  UserController.login);

module.exports = router