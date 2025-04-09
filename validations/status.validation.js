const Joi = require('joi');

const createStatusSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
});

const updateStatusSchema = Joi.object({
    name: Joi.string().min(2).max(50).optional(),
});

module.exports = {
    createStatusSchema,
    updateStatusSchema
};
