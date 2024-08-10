import Joi from 'joi';

 export const signupSchema = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    email:Joi.string().email().required(),
    password: Joi.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/),
    confirmPassword:Joi.valid(Joi.ref('password')).required()
})

export const loginInSchema = Joi.object({
    email:Joi.string().email().required()
})