const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Contracts = sequelize.define("contracts", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    client_id: {
        type: DataTypes.INTEGER,
    },
    owner_id: {
        type: DataTypes.INTEGER,
    },
    status_id: {
        type: DataTypes.INTEGER,
    },
    start_date: {
        type: DataTypes.DATE,
    },
    end_date: {
        type: DataTypes.DATE,
    },
    total_price: {
        type: DataTypes.DECIMAL,
    },
    condition: {
        type: DataTypes.STRING
    },

},
    {
        timestamps: true
    }
);

// // Contracts belongsTo Clients
// Contracts.belongsTo(Clients, {
//     foreignKey: "client_id",
//     as: "client",
// });

// // Clients hasMany Contracts
// Clients.hasMany(Contracts, {
//     foreignKey: "client_id",
//     as: "contracts"
// });

module.exports = Contracts