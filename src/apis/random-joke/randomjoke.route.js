const express = require('express');
const randomJokeController = require('./controller/randomjoke.controller.js');
const isSignedIn = require('../../middleware/isAuth.js').isSignedIn;

const router = express.Router();


router.get('/', isSignedIn, randomJokeController.getRandomJoke);



module.exports = router