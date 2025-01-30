const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../db/queries/categories.js");

const createCategories = async (req, res) => {
  try {
    const newCategory = await createCategory(req.body);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteCategories = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCategory(id);
    res.status(200).json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedCategory = await updateCategory(id, updatedData);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createCategories,
  getCategories,
  deleteCategories,
  updateCategories,
  getSingleCategory,
};
