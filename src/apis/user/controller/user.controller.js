const APIResponseFormat = require('../../../utils/APIResponseFormat.js');
const UserService = require('../service/user.service.js');
const md5 = require('md5');
const jwt = require('jsonwebtoken');




const signup = async (req, res) => {
    try {

        // check if user already exists
        const user = await UserService.getUserByEmail(req.body.email);
        if (user) {
            console.log("user already exists");
            return APIResponseFormat._ResError(res, "User already exists");
        }

        const register = await UserService.signup(req.body);
        return APIResponseFormat._ResCreated(res, "User signed up successfully!!!", register);
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

const login = async (req, res) => {
    try {
        
        // check if user exists or not
        const user = await UserService.getUserByEmail(req.body.email);
        if (!user) {
            return APIResponseFormat._ResError(res, "User not found !!!");
        }

        // check if password is correct
        let userData = await UserService.comparePassword(req.body.password);
        if (!userData) {
            return APIResponseFormat._ResError(res, "Invalid credentials !!!");
        }

        // check if user is isLogin or not
        if (user.islogin) {
            return APIResponseFormat._ResError(res, "User is already logged in !!!");
        }


        // create a token
        const payload = {
            id : user.id,
            name : user.name,
            age : user.age
        }

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_LIFE,
            algorithm: "HS256",
          });


        userData = {
            accessToken,
            ...userData.dataValues,
        }


        // update isLogin
        await UserService.updateIsLogin(user.id, {
            islogin : true
        });



        return APIResponseFormat._ResSuccess(res, "User logged in successfully!!!", userData);

    }
    catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

const getProfile = async (req, res) => {
    try {


        // check if user exists or not
        if (!req.user) {
            return APIResponseFormat._ResError(res, "User not found !!!");
        }


        const user = await UserService.getUserById(req.user.id);

        return APIResponseFormat._ResSuccess(res, "User profile fetched successfully!!!", user);
    }
    catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

const logout = async (req, res) => {
    try {
        
        // check if user exists or not
        if (!req.user) {
            return APIResponseFormat._ResError(res, "User not found !!!");
        }

        // set isLogin to false
        await UserService.updateIsLogin(req.user.id, {
            islogin : false
        })

        return APIResponseFormat._ResSuccess(res, "User logged out successfully!!!");

    }
    catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}



module.exports = {
    signup,
    login,
    getProfile,
    logout
}