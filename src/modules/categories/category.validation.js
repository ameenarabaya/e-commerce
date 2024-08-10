import Joi from "joi";

export const createCategorySchema = Joi.object({
    name:Joi.string().min(3).required(),
    image:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/png','image/jpeg','image/webp').required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size:Joi.number().required().max(1000000)
    }).required()
})
export const updateSchema = Joi.object({
    id:Joi.string().hex().length(24),
    name:Joi.string().min(3).required(),
    status:Joi.string().valid('Active','NotActive'),
    image:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/png','image/jpeg','image/webp').required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size:Joi.number().required().max(1000000)
    }).required()
})
export const deleteSchema = Joi.object({
    id:Joi.string().hex().length(24)
})

