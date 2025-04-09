const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Contracts = require('./contracts.model');

const ContractItems = sequelize.define("contract_items", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    contract_id: {
        type: DataTypes.INTEGER,
    },
    product_id: {
        type: DataTypes.INTEGER,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    price: {
        type: DataTypes.DECIMAL(10,2)
    }

},
    {
        timestamps: true
    }
);

module.exports = ContractItems