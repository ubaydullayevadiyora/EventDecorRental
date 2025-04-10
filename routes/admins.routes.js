const { addNewAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin, loginAdmin, logoutAdmin, refreshToken } = require("../controllers/admins.controller")
const adminAuth = require("../middlewares/auth/admin.auth")
const adminGuard = require("../middlewares/guards/admin.guard")
const selfCreatorGuard = require("../middlewares/guards/self-creator.guard")

const router = require("express").Router()

router.post("/", adminAuth, selfCreatorGuard, addNewAdmin)
router.get("/admins", adminAuth, adminGuard, getAllAdmins)
router.get("/:id", adminAuth, adminGuard, getAdminById)
router.put("/update/:id", adminAuth, selfCreatorGuard, updateAdmin)
router.delete("/delete/:id", adminAuth, selfCreatorGuard, deleteAdmin)

router.post("/login", loginAdmin)
router.post("/logout/:id", adminAuth, adminGuard, logoutAdmin);
router.post("/refresh", refreshToken);

module.exports = router