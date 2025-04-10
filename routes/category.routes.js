const { addNewCategory, getCategoryById, updateCategory, deleteCategory, getAllCategory } = require("../controllers/category.controller")
const adminAuth = require("../middlewares/auth/admin.auth")
const adminGuard = require("../middlewares/guards/admin.guard")

const router = require("express").Router()

router.post("/", adminAuth, adminGuard, addNewCategory)
router.get("/category", getAllCategory)
router.get("/:id", getCategoryById)
router.put("/update/:id", adminAuth, adminGuard, updateCategory)
router.delete("/delete/:id", adminAuth, adminGuard, deleteCategory)

module.exports = router