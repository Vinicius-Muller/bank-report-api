const pool = require("../index");

const getUsers = async () => {
  try {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getUsersByEmail = async (email) => {
  try {
    const result = await pool.query(
      `SELECT name, email, category_id, created_at, updated_at FROM users WHERE email = '${email}'`
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = '${id}'`);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const createUser = async (name, email, password, category_id) => {
  try {
    const result = await pool.query(`
    INSERT INTO users 
    (name, email, password, category_id) VALUES 
    (${name}, ${email}, ${password}, ${category_id});`);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, name, email, category_id) => {
  try {
    const result = await pool.query(`
      UPDATE users SET 
      name = ${name}, 
      email = ${email}, 
      category_id = ${category_id} 
      WHERE id = ${id}
    `);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    await pool.query(`DELETE FROM users WHERE id = ${id}`);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsersByEmail,
};
