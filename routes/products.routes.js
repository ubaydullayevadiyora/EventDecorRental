const { addNewProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/products.controller")
const ownerAuth = require("../middlewares/auth/owner.auth")
const ownerGuard = require("../middlewares/guards/owner.guard")

const router = require("express").Router()

router.post("/", ownerAuth, ownerGuard, addNewProduct)
router.get("/products", ownerAuth, ownerGuard, getAllProducts)
router.get("/:id", ownerAuth, ownerGuard, getProductById)
router.put("/update/:id", ownerAuth, ownerGuard, updateProduct)
router.delete("/delete/:id", ownerAuth, ownerGuard, deleteProduct)

module.exports = router