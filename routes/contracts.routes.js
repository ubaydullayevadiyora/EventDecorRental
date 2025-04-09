const { getAllContracts, getContractById, updateContract, deleteContract, addNewContract } = require("../controllers/contracts.controller")

const ownerAuth = require("../middlewares/auth/owner.auth")
const ownerGuard = require("../middlewares/guards/owner.guard")
const router = require("express").Router()

router.post("/", ownerAuth, ownerGuard, addNewContract)
router.get("/contracts", ownerAuth, ownerGuard,  getAllContracts)
router.get("/:id", ownerAuth, ownerGuard,  getContractById)
router.put("/update/:id", ownerAuth, ownerGuard, updateContract)
router.delete("/delete/:id", ownerAuth, ownerGuard, deleteContract)

module.exports = router