const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ClientPassport = sequelize.define("client_passport", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    client_id: {
        type: DataTypes.INTEGER,
    },
    passport_number: {
        type: DataTypes.STRING,
    },
    issue_date: {
        type: DataTypes.DATE,
    },
    expiry_date: {
        type: DataTypes.DATE,
    },
    issued_by: {
        type: DataTypes.STRING,
    },
    nationality: {
        type: DataTypes.STRING,
    },

},
    {
        timestamps: true
    }
);

module.exports = ClientPassport