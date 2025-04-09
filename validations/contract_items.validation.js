const Joi = require('joi');

const createContractItemSchema = Joi.object({
    order_id: Joi.number().integer().required(),
    product_id: Joi.number().integer().required(),
    quantity: Joi.number().integer().required(),
    price: Joi.number().precision(2).required()
});

const updateContractItemSchema = Joi.object({
    order_id: Joi.number().integer().optional(),
    product_id: Joi.number().integer().optional(),
    quantity: Joi.number().integer().optional(),
    price: Joi.number().precision(2).optional()
});

module.exports = {
    createContractItemSchema,
    updateContractItemSchema
};
