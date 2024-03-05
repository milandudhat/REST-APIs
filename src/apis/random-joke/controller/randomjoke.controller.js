const APIResponseFormat = require('../../../utils/APIResponseFormat.js');
const randomJokeService = require('../service/randomjoke.service.js');
const md5 = require('md5');
const jwt = require('jsonwebtoken');




const getRandomJoke = async (req, res) => {
    try {

        const randomJoke = await randomJokeService.getRandomJoke();

        return APIResponseFormat._ResCreated(res, "Random Joke fetched successfully!!!", randomJoke);
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}


module.exports = {
    getRandomJoke
}