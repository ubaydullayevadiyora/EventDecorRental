const { addNewCategory, getCategoryById, updateCategory, deleteCategory, getAllCategory } = require("../controllers/category.controller")

const router = require("express").Router()

router.post("/", addNewCategory)
router.get("/category", getAllCategory)
router.get("/:id", getCategoryById)
router.put("/update/:id", updateCategory)
router.delete("/delete/:id", deleteCategory)

module.exports = router