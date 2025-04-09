const Joi = require('joi');

const phoneRegex = /^\d{2}-\d{3}-\d{2}-\d{2}$/;

const createClientSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone_number: Joi.string().pattern(phoneRegex).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    refresh_token: Joi.string().optional(),
    otp: Joi.string().optional()
});

const updateClientSchema = Joi.object({
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    phone_number: Joi.string().pattern(phoneRegex).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
    refresh_token: Joi.string().optional(),
    otp: Joi.string().optional()
});

module.exports = {
    createClientSchema,
    updateClientSchema
};
