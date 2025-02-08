const pool = require("../index");

const createCategoriesDto = (fields) => {
  const { title, color, user_id } = fields;

  return `
    INSERT INTO categories 
    (title, color, user_id) VALUES 
    ('${title}', '${color}', '${user_id}')
  `;
};

const updateCategoriesDto = (id, fields) => {
  const { title, color, user_id } = fields;

  return `
    UPDATE categories SET 
    title = '${title}',
    color = '${color}',
    user_id = '${user_id}'
    WHERE id = '${id}';
  `;
};

const getAllCategories = async (id) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM categories WHERE user_id = '${id}';
      `
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
    const query = updateCategoriesDto( id, fields );
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
