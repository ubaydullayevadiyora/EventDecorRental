const Joi = require("joi");

const createAdminSchema = Joi.object({
    first_name: Joi.string()
        .min(2)
        .max(50)
        .regex(/^[A-Za-z]+$/)
        .required(),
    last_name: Joi.string()
        .min(2)
        .max(50)
        .regex(/^[A-Za-z]+$/)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .max(128)
        .required(),
});

const updateAdminSchema = Joi.object({
    first_name: Joi.string()
        .min(2)
        .max(50)
        .regex(/^[A-Za-z]+$/)
        .optional(),
    last_name: Joi.string()
        .min(2)
        .max(50)
        .regex(/^[A-Za-z]+$/)
        .optional(),
    email: Joi.string()
        .email()
        .optional(),
    password: Joi.string()
        .min(6)
        .max(128)
        .optional(),
});

module.exports = {
    createAdminSchema,
    updateAdminSchema
};
