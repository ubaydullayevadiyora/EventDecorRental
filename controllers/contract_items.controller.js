const { errorHandler } = require("../helpers/error_handler")
const ContractItems = require("../models/contract_items.model")

const addNewContractItems = async (req, res) => {
    try {
        const { contract_id, product_id, quantity, price } = req.body
        const newContractItems = await ContractItems.create({ contract_id, product_id, quantity, price })
        res.status(201).send({ message: "new contract_items added", newContractItems })
    } catch (error) {
        errorHandler(error, res)
    }
}

const getAllContractItems = async (req, res) => {
    try {
        const contract_itemss = await ContractItems.findAll();

        if (!contract_itemss || contract_itemss.length === 0) {
            return res.status(404).json({ message: "contract_itemss not found" });
        }

        res.status(200).json({ message: "Here you are", contract_itemss });
    } catch (error) {
        console.error("getAllContractItems error:", error);
        errorHandler(error, res);
    }
};

const getContractItemsById = async (req, res) => {
    try {
        const { id } = req.params;
        const contract_items = await ContractItems.findByPk(id);
        res.status(201).send({ message: "here you are", contract_items })
    } catch (error) {
        errorHandler(error, res)
    }

}

const updateContractItems = async (req, res) => {
    try {
        console.log('req.body:', req.body);
        const { id } = req.params;
        const { contract_id, product_id, quantity, price } = req.body

        const contract_items = await ContractItems.update(
            { contract_id, product_id, quantity, price },
            { where: { id }, returning: true }
        );
        res.status(201).json({ contract_items: contract_items[1][0] })
    } catch (error) {
        errorHandler(error, res)
    }

}

const deleteContractItems = async (req, res) => {
    try {
        const { id } = req.params;
        const contract_items = await ContractItems.destroy({ where: { id } });
        res.status(201).send({ message: "deleted contract_items", contract_items })
    } catch (error) {
        errorHandler(error, res)
    }

}

module.exports = {
    addNewContractItems,
    getAllContractItems,
    getContractItemsById,
    updateContractItems,
    deleteContractItems,
}