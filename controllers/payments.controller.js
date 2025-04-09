const { errorHandler } = require("../helpers/error_handler")
const Payments = require("../models/payments.model")

const addNewPayment = async (req, res) => {
    try {
        const { contract_id, amount, payment_method, payment_status } = req.body
        const amount_paid = payment_status === "paid" ? amount : 0;
        const remaining = payment_status === "paid" ? 0 : amount;
        const newPayment = await Payments.create({ contract_id, amount, payment_method, payment_status, amount_paid, remaining })
        res.status(201).send({ message: "new payment added", newPayment })
    } catch (error) {
        errorHandler(error, res)
    }
}

const getAllPayments = async (req, res) => {
    try {
        const payments = await Payments.findAll();

        if (!payments || payments.length === 0) {
            return res.status(404).json({ message: "payments not found" });
        }

        res.status(200).json({ message: "Here you are", payments });
    } catch (error) {
        console.error("getAllPayments error:", error);
        errorHandler(error, res);
    }
};

const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payments.findByPk(id);
        res.status(201).send({ message: "here you are", payment })
    } catch (error) {
        errorHandler(error, res)
    }

}

const updatePayment = async (req, res) => {
    try {
        console.log('req.body:', req.body);
        const { id } = req.params;
        const { contract_id, amount, payment_method, payment_status, amount_paid, remaining_amount } = req.body

        const payment = await Payments.update(
            { contract_id, amount, payment_method, payment_status, amount_paid, remaining_amount },
            { where: { id }, returning: true }
        );
        res.status(201).json({ payment: payment[1][0] })
    } catch (error) {
        errorHandler(error, res)
    }

}

const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payments.destroy({ where: { id } });
        res.status(201).send({ message: "deleted payment", payment })
    } catch (error) {
        errorHandler(error, res)
    }

}

module.exports = {
    addNewPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
}