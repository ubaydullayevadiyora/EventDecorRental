const { errorHandler } = require("../helpers/error_handler")
const Category = require("../models/category.model")

const addNewCategory = async (req, res) => {
    try {
        const { name } = req.body
        const newCategory = await Category.create({ name })
        res.status(201).send({ message: "new category added", newCategory })
    } catch (error) {
        errorHandler(error, res)
    }
}

const getAllCategory = async (req, res) => {
    try {
        const categorys = await Category.findAll();

        if (!categorys || categorys.length === 0) {
            return res.status(404).json({ message: "categorys not found" });
        }

        res.status(200).json({ message: "Here you are", categorys });
    } catch (error) {
        console.error("getAllCategory error:", error);
        errorHandler(error, res);
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        res.status(201).send({ message: "here you are", category })
    } catch (error) {
        errorHandler(error, res)
    }

}

const updateCategory = async (req, res) => {
    try {
        console.log('req.body:', req.body);
        const { id } = req.params;
        const { name } = req.body

        const category = await Category.update(
            { name },
            { where: { id }, returning: true }
        );
        res.status(201).json({ category: category[1][0] })
    } catch (error) {
        errorHandler(error, res)
    }

}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.destroy({ where: { id } });
        res.status(201).send({ message: "deleted category", category })
    } catch (error) {
        errorHandler(error, res)
    }

}

module.exports = {
    addNewCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
}