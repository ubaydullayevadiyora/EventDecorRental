const { errorHandler } = require("../helpers/error_handler")
const ClientPassports = require("../models/client_passport.model")

const addNewClientPassport = async (req, res) => {
    try {
        const { client_id, passport_number, issue_date, expiry_date, issue_by, nationality } = req.body
        
        const newClientPassport = await ClientPassports.create({ client_id, passport_number, issue_date, expiry_date, issue_by, nationality })
        res.status(201).send({ message: "new client_passport added", newClientPassport })
    } catch (error) {
        errorHandler(error, res)
    }
}

const getAllClientPassports = async (req, res) => {
    try {
        const client_passports = await ClientPassports.findAll();

        if (!client_passports || client_passports.length === 0) {
            return res.status(404).json({ message: "client_passports not found" });
        }

        res.status(200).json({ message: "Here you are", client_passports });
    } catch (error) {
        console.error("getAllClientPassports error:", error);
        errorHandler(error, res);
    }
};

const getClientPassportById = async (req, res) => {
    try {
        const { id } = req.params;
        const client_passport = await ClientPassports.findByPk(id);
        res.status(201).send({ message: "here you are", client_passport })
    } catch (error) {
        errorHandler(error, res)
    }

}

const updateClientPassport = async (req, res) => {
    try {
        console.log('req.body:', req.body);
        const { id } = req.params;
        const { client_id, passport_number, issue_date, expiry_date, issue_by, nationality } = req.body

        const client_passport = await ClientPassports.update(
            { client_id, passport_number, issue_date, expiry_date, issue_by, nationality },
            { where: { id }, returning: true }
        );
        res.status(201).json({ client_passport: client_passport[1][0] })
    } catch (error) {
        errorHandler(error, res)
    }

}

const deleteClientPassport = async (req, res) => {
    try {
        const { id } = req.params;
        const client_passport = await ClientPassports.destroy({ where: { id } });
        res.status(201).send({ message: "deleted client_passport", client_passport })
    } catch (error) {
        errorHandler(error, res)
    }

}

module.exports = {
    addNewClientPassport,
    getAllClientPassports,
    getClientPassportById,
    updateClientPassport,
    deleteClientPassport,
}