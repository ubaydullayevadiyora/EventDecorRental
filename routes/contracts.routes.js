const { getAllContracts, getContractById, updateContract, deleteContract, addNewContract } = require("../controllers/contracts.controller")
const clientsAuth = require("../middlewares/auth/clients.auth")
const clientGuard = require("../middlewares/guards/client.guard")

const router = require("express").Router()

router.post("/", clientsAuth, clientGuard, addNewContract)
router.get("/contracts", clientsAuth, clientGuard, getAllContracts)
router.get("/:id", clientsAuth, clientGuard, getContractById)
router.put("/update/:id", clientsAuth, clientGuard, updateContract)
router.delete("/delete/:id", clientsAuth, clientGuard, deleteContract)

module.exports = router