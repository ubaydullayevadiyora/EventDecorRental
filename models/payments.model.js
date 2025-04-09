const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Contracts = require('./contracts.model');

const Payments = sequelize.define("payments", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    contract_id: {
        type: DataTypes.INTEGER,
    },
    amount: {
        type: DataTypes.DECIMAL,
    },
    payment_method: {
        type: DataTypes.ENUM("cash", "card", "transfer"),
    },
    payment_status: {
        type: DataTypes.ENUM("pending", "partially_paid", "paid", "canceled"),
    },
    amount_paid: {
        type: DataTypes.DECIMAL,
    },
    remaining: {
        type: DataTypes.DECIMAL,
    },

},
    {
        timestamps: true
    }
);

module.exports = Payments