const express = require('express');
const { getProductsRentedInPeriod, getDamagingClients, getCancelledClients, getTopOwnersByCategory, getClientPayments } = require('../controllers/filter.controller');
const ownerAuth = require('../middlewares/auth/owner.auth');
const ownerGuard = require('../middlewares/guards/owner.guard');
const router = express.Router();

router.get('/products', ownerAuth, ownerGuard, getProductsRentedInPeriod);
router.get('/clients/damaged', ownerAuth, ownerGuard, getDamagingClients);
router.get('/clients/cancelled', ownerAuth, ownerGuard, getCancelledClients);
router.get('/owners/top', ownerAuth, ownerGuard, getTopOwnersByCategory);
router.get('/clients/payments/:clientId', ownerAuth, ownerGuard, getClientPayments);

module.exports = router;