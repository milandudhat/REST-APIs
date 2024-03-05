const CryptoJS = require("crypto-js");
const md5 = require("md5");
const key = CryptoJS.SHA256(process.env.ENC_KEY);
const iv = CryptoJS.enc.Base64.parse("");
const jwt = require("jsonwebtoken");
const { z, ZodError } = require('zod');

const userSchemasignup = z.object({
    name: z
        .string({
            required_error: "Full name is required",
        })
        .nonempty(),
    email: z
        .string({
            required_error: "Email is required",
        })
        .email("Not a valid email"),
    password: z
        .string({
            required_error: "Password is required",
        })
        .min(6, "Password too short"),
    city: z
        .string({
            required_error: "City is required",
        })
        .nonempty(),
    age : z
        .number({
            required_error: "Age is required",
        })
        .min(1, "Age must be greater than 0")
        .max(100, "Age must be less than 100")
        .int("Age must be an integer")
        .positive("Age must be positive")
        
        
});

const validateUserSchemaSignup = (req, res, next) => {
    try {
        userSchemasignup.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: 'Validation failed', details: error.errors });
        } else {
            next(error);
        }
    }
};


const userSchemalogin = z.object({
    email: z
        .string({
            required_error: "Email is required",
        })
        .email("Not a valid email"),
    password: z
        .string({
            required_error: "Password is required",
        })
        .min(6, "Password too short"),
})

const validateUserSchemalogin = (req, res, next) => {
    try {
        userSchemalogin.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: 'Validation failed', details: error.errors });
        }
        else {
            next(error);
        }
    }
}


module.exports = {
    validateUserSchemaSignup,
    validateUserSchemalogin
}
