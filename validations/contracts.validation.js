const Joi = require('joi');

const createContractSchema = Joi.object({
    client_id: Joi.number().integer().required(),
    owner_id: Joi.number().integer().required(),
    status_id: Joi.number().integer().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    total_price: Joi.number().precision(2).required(),
    condition: Joi.string().optional()
});

const updateContractSchema = Joi.object({
    client_id: Joi.number().integer().optional(),
    owner_id: Joi.number().integer().optional(),
    status_id: Joi.number().integer().optional(),
    start_date: Joi.date().optional(),
    end_date: Joi.date().optional(),
    total_price: Joi.number().precision(2).optional(),
    condition: Joi.string().optional()
});

module.exports = {
    createContractSchema,
    updateContractSchema
};
