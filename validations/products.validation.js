const Joi = require('joi');

const createProductSchema = Joi.object({
    category_id: Joi.number().integer().required(),
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(1000).optional().allow(''),
    price_per_day: Joi.number().precision(2).positive().required(),
    available_quantity: Joi.number().integer().min(0).required(),
    image_url: Joi.string().uri().optional().allow('', null),
});

const updateProductSchema = Joi.object({
    category_id: Joi.number().integer().optional(),
    name: Joi.string().min(2).max(100).optional(),
    description: Joi.string().max(1000).optional().allow(''),
    price_per_day: Joi.number().precision(2).positive().optional(),
    available_quantity: Joi.number().integer().min(0).optional(),
    image_url: Joi.string().uri().optional().allow('', null),
});

module.exports = {
    createProductSchema,
    updateProductSchema
};
