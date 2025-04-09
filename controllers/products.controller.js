const { errorHandler } = require("../helpers/error_handler")
const Products = require("../models/products.model")

const addNewProduct = async (req, res) => {
    try {
        const { category_id, name, description, price_per_day, available_quantity, image_url, owner_id } = req.body
        const newProduct = await Products.create({ category_id, name, description, price_per_day, available_quantity, image_url, owner_id })
        res.status(201).send({ message: "new product added", newProduct })
    } catch (error) {
        errorHandler(error, res)
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Products.findAll();

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "products not found" });
        }

        res.status(200).json({ message: "Here you are", products });
    } catch (error) {
        console.error("getAllProducts error:", error);
        errorHandler(error, res);
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findByPk(id);
        res.status(201).send({ message: "here you are", product })
    } catch (error) {
        errorHandler(error, res)
    }

}

const updateProduct = async (req, res) => {
    try {
        console.log('req.body:', req.body);
        const { id } = req.params;
        const { category_id, name, description, price_per_day, available_quantity, image_url, owner_id } = req.body

        const product = await Products.update(
            { category_id, name, description, price_per_day, available_quantity, image_url, owner_id },
            { where: { id }, returning: true }
        );
        res.status(201).json({ product: product[1][0] })
    } catch (error) {
        errorHandler(error, res)
    }

}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.destroy({ where: { id } });
        res.status(201).send({ message: "deleted product", product })
    } catch (error) {
        errorHandler(error, res)
    }

}

module.exports = {
    addNewProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
}