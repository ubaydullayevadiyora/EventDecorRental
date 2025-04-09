const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Admins = sequelize.define("admins", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
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
    is_creator: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    timestamps: true
});

module.exports = Admins;
