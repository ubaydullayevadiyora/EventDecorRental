const { addNewPayment, getAllPayments, getPaymentById, updatePayment, deletePayment } = require("../controllers/payments.controller")
const clientsAuth = require("../middlewares/auth/clients.auth")
const clientGuard = require("../middlewares/guards/client.guard")

const router = require("express").Router()

router.post("/", clientsAuth, clientGuard, addNewPayment)
router.get("/payments", clientsAuth, clientGuard, getAllPayments)
router.get("/:id", clientsAuth, clientGuard, getPaymentById)
router.put("/update/:id", clientsAuth, clientGuard, updatePayment)
router.delete("/delete/:id", clientsAuth, clientGuard, deletePayment)

module.exports = router