const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Products = sequelize.define("products", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category_id: {
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price_per_day: {
        type: DataTypes.DECIMAL,
    },
    available_quantity: {
        type: DataTypes.INTEGER,
    },
    image_url: {
        type: DataTypes.STRING,
    },
    owner_id: {
        type: DataTypes.INTEGER,
    },

},
    {
        timestamps: true
    }
);

module.exports = Products