const { getAllContractItems, deleteContractItems, updateContractItems, getContractItemsById, addNewContractItems } = require("../controllers/contract_items.controller")
const clientsAuth = require("../middlewares/auth/clients.auth")
const ownerAuth = require("../middlewares/auth/owner.auth")
const clientGuard = require("../middlewares/guards/client.guard")
const ownerGuard = require("../middlewares/guards/owner.guard")

const router = require("express").Router()

router.post("/add", clientsAuth, clientGuard, addNewContractItems)
router.get("/contract_items", clientsAuth, clientGuard, getAllContractItems)
router.get("/:id", clientsAuth, clientGuard, getContractItemsById)
router.put("/update/:id", ownerAuth, ownerGuard, updateContractItems)
router.delete("/delete/:id", ownerAuth, ownerGuard, deleteContractItems)

module.exports = router