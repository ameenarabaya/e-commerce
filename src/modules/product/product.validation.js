import Joi from "joi"; 

export const createProductSchema = Joi.object({
    name:Joi.string().min(3).required(),
    stock:Joi.number().min(1).default(0),
    price:Joi.number().min(1).required(),
    discount:Joi.number().min(0).default(0),
    description:Joi.string().required(),
    image:Joi.array().items({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/png','image/jpeg','image/webp').required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size:Joi.number().required().max(1000000)
    }).optional(),
    subImages:Joi.array().items(
        Joi.object(
        {
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/png','image/jpeg','image/webp').required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size:Joi.number().required().max(1000000)
    })).optional().max(5),
    categoryId:Joi.string().hex().length(24),
    subCategoryId:Joi.string().hex().length(24),
    size:Joi.array().items(Joi.string().valid('s','m','l','xl')).optional,
})