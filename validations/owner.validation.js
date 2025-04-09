const Joi = require('joi');

const phoneRegex = /^\d{2}-\d{3}-\d{2}-\d{2}$/;
// oddiy telefon raqami formati: 90-123-45-67

const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

const createOwnerSchema = Joi.object({
    first_name: Joi.string().min(2).max(50).regex(/^[A-Za-z]+$/).required(),
    last_name: Joi.string().min(2).max(50).regex(/^[A-Za-z]+$/).required(),
    phone_number: Joi.string().pattern(phoneRegex).required(),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).max(100).required(),
    refresh_token: Joi.string().optional().allow(null, ''),
    otp: Joi.string().length(6).optional().allow(null, '').pattern(/^\d+$/),
});

const updateOwnerSchema = Joi.object({
    first_name: Joi.string().min(2).max(50).regex(/^[A-Za-z]+$/).optional(),
    last_name: Joi.string().min(2).max(50).regex(/^[A-Za-z]+$/).optional(),
    phone_number: Joi.string().pattern(phoneRegex).optional(),
    email: Joi.string().pattern(emailRegex).optional(),
    password: Joi.string().min(6).max(100).optional(),
    refresh_token: Joi.string().optional().allow(null, ''),
    otp: Joi.string().length(6).optional().allow(null, '').pattern(/^\d+$/),
});

module.exports = {
    createOwnerSchema,
    updateOwnerSchema
};
