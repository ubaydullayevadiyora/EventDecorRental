const { errorHandler } = require("../helpers/error_handler")
const Status = require("../models/status.model")

const addNewStatus = async (req, res) => {
    try {
        const { name } = req.body
        const newStatus = await Status.create({ name })
        res.status(201).send({ message: "new status added", newStatus })
    } catch (error) {
        errorHandler(error, res)
    }
}

const getAllStatus = async (req, res) => {
    try {
        const statuss = await Status.findAll();

        if (!statuss || statuss.length === 0) {
            return res.status(404).json({ message: "statuss not found" });
        }

        res.status(200).json({ message: "Here you are", statuss });
    } catch (error) {
        console.error("getAllStatus error:", error);
        errorHandler(error, res);
    }
};

const getStatusById = async (req, res) => {
    try {
        const { id } = req.params;
        const status = await Status.findByPk(id);
        res.status(201).send({ message: "here you are", status })
    } catch (error) {
        errorHandler(error, res)
    }

}

const updateStatus = async (req, res) => {
    try {
        console.log('req.body:', req.body);
        const { id } = req.params;
        const { name } = req.body

        const status = await Status.update(
            { name },
            { where: { id }, returning: true }
        );
        res.status(201).json({ status: status[1][0] })
    } catch (error) {
        errorHandler(error, res)
    }

}

const deleteStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const status = await Status.destroy({ where: { id } });
        res.status(201).send({ message: "deleted status", status })
    } catch (error) {
        errorHandler(error, res)
    }

}

module.exports = {
    addNewStatus,
    getAllStatus,
    getStatusById,
    updateStatus,
    deleteStatus,
}