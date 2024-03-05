const express = require('express');
const UserController = require('./controller/user.controller.js');

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.post('/', UserController.addUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router