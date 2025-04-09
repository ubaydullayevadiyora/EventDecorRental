const Joi = require('joi');

const createClientPassportSchema = Joi.object({
    client_id: Joi.number().integer().required(),
    passport_number: Joi.string().required(),
    issue_date: Joi.date().required(),
    expiry_date: Joi.date().required(),
    issued_by: Joi.string().required(),
    nationality: Joi.string().required()
});

const updateClientPassportSchema = Joi.object({
    client_id: Joi.number().integer().optional(),
    passport_number: Joi.string().optional(),
    issue_date: Joi.date().optional(),
    expiry_date: Joi.date().optional(),
    issued_by: Joi.string().optional(),
    nationality: Joi.string().optional()
});

module.exports = {
    createClientPassportSchema,
    updateClientPassportSchema
};
