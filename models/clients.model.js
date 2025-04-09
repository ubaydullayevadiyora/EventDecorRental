const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Contracts = require('./contracts.model');
const ClientPassport = require('./client_passport.model');

const Clients = sequelize.define("clients", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
    },
    phone_number: {
        type: DataTypes.STRING,
        validate: {
            is: /^\d{2}-\d{3}-\d{2}-\d{2}$/
        }
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            is: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim
        },
        unique:true
    },
    password: {
        type: DataTypes.STRING,
    },
    refresh_token: {
        type: DataTypes.STRING,
    },
    otp: {
        type: DataTypes.STRING,
    },

},
    {
        timestamps: true
    }
);

module.exports = Clients