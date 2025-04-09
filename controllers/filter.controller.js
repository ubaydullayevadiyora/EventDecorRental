const { Op } = require("sequelize");
const Contracts = require("../models/contracts.model");
const Status = require("../models/status.model");
const ContractItems = require("../models/contract_items.model");
const Products = require("../models/products.model");
const Category = require("../models/category.model");
const Owner = require("../models/owner.model");
const Payments = require("../models/payments.model");
const sequelize = require('../config/db'); 
const Clients = require("../models/clients.model");

//___ products ijarasi
const getProductsRentedInPeriod = async (req, res) => {
    const { start, end } = req.query;

    const contracts = await Contracts.findAll({
        where: {
            start_date: { [Op.gte]: start },
            end_date: { [Op.lte]: end }
        },
        include: [{
            model: ContractItem,
            include: [Product]
        }]
    });

    res.json(contracts);
};

//___ yaroqsiz holatga keltirgan clientlar
const getDamagingClients = async (req, res) => {
    const { start, end } = req.query;

    try {
    
        const contracts = await Contracts.findAll({
            where: {
                start_date: { [Op.gte]: start },
                end_date: { [Op.lte]: end },
                status_id: 3 
            },
            include: [
                {
                    model: Clients,
                    as: "client"
                }
            ]
        });

        const uniqueClients = [
            ...new Map(contracts.map(c => [c.client.id, c.client])).values()
        ];

        res.json(uniqueClients);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//___ buyurtmani bekor qilgan clientlar
const getCancelledClients = async (req, res) => {
    const { start, end } = req.query;

    const cancelledStatus = await Status.findOne({ where: { name: 'cancelled' } });

    const contracts = await Contracts.findAll({
        where: {
            start_date: { [Op.gte]: start },
            end_date: { [Op.lte]: end },
            status_id: cancelledStatus.id
        },
        include: [Clients]
    });

    const uniqueClients = [...new Map(contracts.map(c => [c.client.id, c.client])).values()];
    res.json(uniqueClients);
};

//___ eng kop ijaraga bergan Ownerlar
const getTopOwnersByCategory = async (req, res) => {
    const category_id = req.query.category_id?.trim();

    try {
        const items = await ContractItems.findAll({
            include: [{
                model: Products,
                where: { category_id },
                include: [Owner]
            }],
            attributes: [
                [sequelize.col('product.owner.id'), 'ownerId'],
                [sequelize.fn('COUNT', sequelize.col('contract_items.id')), 'rentalCount']
            ],
            group: ['product.owner.id', 'product.id', 'product.owner.id'],
            order: [[sequelize.fn('COUNT', sequelize.col('contract_items.id')), 'DESC']]
        });

        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};




//__ clientni barcha paymentlari (categoriya, product, owner)
const getClientPayments = async (req, res) => {
    const { clientId } = req.params;

    const contracts = await Contracts.findAll({
        where: { client_id: clientId },
        include: [
            {
                model: ContractItems,
                include: [{
                    model: Products,
                    include: [Category, Owner]
                }]
            },
            Payments
        ]
    });

    res.json(contracts);
};

module.exports = {
    getProductsRentedInPeriod,
    getDamagingClients,
    getCancelledClients,
    getTopOwnersByCategory,
    getClientPayments
};