const Owner = require('./owner.model');
const Products = require('./products.model');
const Contracts = require('./contracts.model');
const ContractItems = require('./contract_items.model');
const Clients = require('./clients.model');
const Status = require('./status.model');
const Category = require('./category.model');
const ClientPassport = require('./client_passport.model');
const Payments = require('./payments.model');

Owner.hasMany(Contracts, { foreignKey: 'owner_id' });
Contracts.belongsTo(Owner, { foreignKey: 'owner_id' });

Owner.hasMany(Products, { foreignKey: 'owner_id' });
Products.belongsTo(Owner, { foreignKey: 'owner_id', as:'owner' });

Products.hasMany(ContractItems, { foreignKey: 'product_id' });
ContractItems.belongsTo(Products, { foreignKey: 'product_id' });

Category.hasMany(Products, { foreignKey: 'category_id' });
Products.belongsTo(Category, { foreignKey: 'category_id' });

Status.hasMany(Contracts, { foreignKey: 'status_id' });
Contracts.belongsTo(Status, { foreignKey: 'status_id' });

Clients.hasMany(Contracts, { foreignKey: 'client_id' });
Contracts.belongsTo(Clients, { foreignKey: 'client_id' });

Clients.hasOne(ClientPassport, { foreignKey: 'client_id' });
ClientPassport.belongsTo(Clients, { foreignKey: 'client_id' });

Contracts.hasMany(Payments, { foreignKey: 'contract_id' });
Payments.belongsTo(Contracts, { foreignKey: 'contract_id' });

Contracts.hasMany(ContractItems, { foreignKey: 'contract_id' });
ContractItems.belongsTo(Contracts, { foreignKey: 'contract_id' });

module.exports = {
    Owner,
    Products,
    Contracts,
    ContractItems,
    Clients,
    Status,
    Category,
    ClientPassport,
    Payments
};
