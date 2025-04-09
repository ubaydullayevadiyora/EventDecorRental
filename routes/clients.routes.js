const { addNewClient, getAllClients, getClientById, updateClient, deleteClient, loginClient, logoutClient, refreshToken, sendOtp, verifyOtp } = require("../controllers/clients.controller")
// const authController = require("../middlewares/auth.controller")
const clientGuard = require("../middlewares/guards/client.guard")
const clientsAuth = require("../middlewares/auth/clients.auth")
const selfAdminGuard = require("../middlewares/guards/self-admin.guard")

const router = require("express").Router()

router.post("/", clientsAuth, selfAdminGuard, addNewClient)
router.get("/all", clientsAuth, clientGuard, getAllClients)
router.get("/clients/:id", clientsAuth, clientGuard, getClientById)
router.put("/update/:id", clientsAuth, selfAdminGuard, updateClient)
router.delete("/delete/:id", clientsAuth, selfAdminGuard, deleteClient)

router.post("/login", loginClient);
router.post("/logout/:id", clientsAuth, clientGuard, logoutClient);
router.post("/refresh", refreshToken);
router.post("/send_otp", sendOtp);
router.post("/verify_otp", verifyOtp);

module.exports = router