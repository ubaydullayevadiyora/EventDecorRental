const router = require("./admins.routes")
const adminsRoutes = require("./admins.routes")
const paymentsRoutes = require("./payments.routes")
const contractsRoutes = require("./contracts.routes")
const productsRoutes = require("./products.routes")
const ownerRoutes = require("./owner.routes")
const clientsRoutes = require("./clients.routes")
const clientPassportRoutes = require("./client_passport.routes")
const categoryRoutes = require("./category.routes")
const statusRoutes = require("./status.routes")
const contractItemsRoutes = require("./contract_items.routes")
const filterRoutes = require("./filter.routes")

router.use("/admins", adminsRoutes)
router.use("/payments", paymentsRoutes)
router.use("/contracts", contractsRoutes)
router.use("/products", productsRoutes)
router.use("/owner", ownerRoutes)
router.use("/clients", clientsRoutes)
router.use("/passport", clientPassportRoutes)
router.use("/category", categoryRoutes)
router.use("/status", statusRoutes)
router.use("/contract_items", contractItemsRoutes)
router.use("/filter", filterRoutes)

module.exports = router