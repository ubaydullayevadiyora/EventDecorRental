const { addNewClientPassport, getAllClientPassports, getClientPassportById, updateClientPassport, deleteClientPassport } = require("../controllers/client_passport.controller")
const clientsAuth = require("../middlewares/auth/clients.auth")
const clientGuard = require("../middlewares/guards/client.guard")

const router = require("express").Router()

router.post("/", clientsAuth, clientGuard, addNewClientPassport)
router.get("/payments", clientsAuth, clientGuard, getAllClientPassports)
router.get("/:id", clientsAuth, clientGuard, getClientPassportById)
router.put("/update/:id", clientsAuth, clientGuard, updateClientPassport)
router.delete("/delete/:id", clientsAuth, clientGuard, deleteClientPassport)

module.exports = router