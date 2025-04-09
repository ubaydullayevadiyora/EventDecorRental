const { errorHandler } = require("../helpers/error_handler")
const Contracts = require("../models/contracts.model")

const addNewContract = async (req, res) => {
    try {
        const { client_id, owner_id, status_id, start_date, end_date, total_price, condition } = req.body
        const newContract = await Contracts.create({ client_id, owner_id, status_id, start_date, end_date, total_price, condition })
        res.status(201).send({ message: "new contract added", newContract })
    } catch (error) {
        errorHandler(error, res)
    }
}

const getAllContracts = async (req, res) => {
    try {
        const contracts = await Contracts.findAll();

        if (!contracts || contracts.length === 0) {
            return res.status(404).json({ message: "contracts not found" });
        }

        res.status(200).json({ message: "Here you are", contracts });
    } catch (error) {
        console.error("getAllContracts error:", error);
        errorHandler(error, res);
    }
};

const getContractById = async (req, res) => {
    try {
        const { id } = req.params;
        const contract = await Contracts.findByPk(id);
        res.status(201).send({ message: "here you are", contract })
    } catch (error) {
        errorHandler(error, res)
    }

}

const updateContract = async (req, res) => {
    try {
        console.log('req.body:', req.body);
        const { id } = req.params;
        const { client_id, owner_id, status_id, start_date, end_date, total_price, condition } = req.body

        const contract = await Contracts.update(
            { client_id, owner_id,  status_id, start_date, end_date, total_price, condition },
            { where: { id }, returning: true }
        );
        res.status(201).json({ contract: contract[1][0] })
    } catch (error) {
        errorHandler(error, res)
    }

}

const deleteContract = async (req, res) => {
    try {
        const { id } = req.params;
        const contract = await Contracts.destroy({ where: { id } });
        res.status(201).send({ message: "deleted contract", contract })
    } catch (error) {
        errorHandler(error, res)
    }

}

//_______________________________________________________________________________________________$

module.exports = {
    addNewContract,
    getAllContracts,
    getContractById,
    updateContract,
    deleteContract,
}