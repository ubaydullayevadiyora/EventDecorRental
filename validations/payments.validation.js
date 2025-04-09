const Joi = require('joi');

const createPaymentSchema = Joi.object({
    contract_id: Joi.number().integer().required(),
    amount: Joi.number().precision(2).positive().required(),
    payment_method: Joi.string().valid("cash", "card", "transfer").required(),
    payment_status: Joi.string().valid("pending", "partially_paid", "paid", "canceled").required(),
    amount_paid: Joi.number().precision(2).min(0).required(),
    remaining: Joi.number().precision(2).min(0).required(),
});

const updatePaymentSchema = Joi.object({
    contract_id: Joi.number().integer().optional(),
    amount: Joi.number().precision(2).positive().optional(),
    payment_method: Joi.string().valid("cash", "card", "transfer").optional(),
    payment_status: Joi.string().valid("pending", "partially_paid", "paid", "canceled").optional(),
    amount_paid: Joi.number().precision(2).min(0).optional(),
    remaining: Joi.number().precision(2).min(0).optional(),
});

module.exports = {
    createPaymentSchema,
    updatePaymentSchema
};
