const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Status = sequelize.define("status", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },

});

module.exports = Status