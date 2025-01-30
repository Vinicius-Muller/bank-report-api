const pool = require("../index");

const createCategoriesDto = (fields) => {
  const { title, color } = fields;

  return `
    INSERT INTO categories 
    (title, color) VALUES 
    ('${title}', '${color}')
  `;
};

const updateCategoriesDto = (fields) => {
  const { id, title, color } = fields;

  return `
    INSERT INTO categories 
    (title, color) VALUES 
    ('${title}', '${color}')
    WHERE id = '${id}'
  `;
};

const getAllCategories = async () => {
  try {
    const result = await pool.query(
      "SELECT id, title, color, created_at, updated_at FROM categories"
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getCategoryById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT id, title, color, created_at, updated_at FROM categories WHERE id = '${id}'`
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const createCategory = async (fields) => {
  try {
    const query = createCategoriesDto(fields);

    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (id, fields) => {
  try {
    const query = updateCategoriesDto({ id, ...fields });
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteCategory = async (id) => {
  try {
    await pool.query(`DELETE FROM categories WHERE id = '${id}'`);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
