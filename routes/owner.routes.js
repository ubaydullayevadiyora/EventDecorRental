const { addNewOwner, getAllOwners, getOwnerById, updateOwner, deleteOwner, loginOwner, logoutOwner, refreshToken, sendOtp, verifyOtp } = require("../controllers/owner.controller")
const ownerAuth = require("../middlewares/auth/owner.auth")
const ownerGuard = require("../middlewares/guards/owner.guard")
const selfAdminGuard = require("../middlewares/guards/self-admin.guard")

const router = require("express").Router()

router.post("/", ownerAuth, selfAdminGuard, addNewOwner)
router.get("/all", ownerAuth, ownerGuard, getAllOwners)
router.get("/:id", ownerAuth, ownerGuard, getOwnerById)
router.put("/update/:id", ownerAuth, selfAdminGuard, updateOwner)
router.delete("/delete/:id", ownerAuth, selfAdminGuard, deleteOwner)

router.post("/login", loginOwner);
router.post("/logout/:id", ownerAuth, ownerGuard, logoutOwner);
router.post("/refresh", refreshToken);
router.post("/send_otp", sendOtp);
router.post("/verify_otp", verifyOtp);

module.exports = router