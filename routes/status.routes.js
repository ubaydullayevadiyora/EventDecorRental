const { addNewStatus, getAllStatus, getStatusById, updateStatus, deleteStatus } = require("../controllers/status.controller")
const ownerAuth = require("../middlewares/auth/owner.auth")
const ownerGuard = require("../middlewares/guards/owner.guard")

const router = require("express").Router()

router.post("/", ownerAuth, ownerGuard, addNewStatus)
router.get("/status", ownerAuth, ownerGuard, getAllStatus)
router.get("/:id", ownerAuth, ownerGuard, getStatusById)
router.put("/update/:id", ownerAuth, ownerGuard, updateStatus)
router.delete("/delete/:id", ownerAuth, ownerGuard, deleteStatus)

module.exports = router