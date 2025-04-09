const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Products = require('./products.model');

const Category = sequelize.define("category", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },

});

module.exports = Category