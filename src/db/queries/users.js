const { encryptPassword } = require("../../helpers/encription");
const pool = require("../index");

const createUsersDto = async (fields) => {
  const { name, email, password, categories } = fields;
  const hashPassword = await encryptPassword(password);

  if (categories) {
    return `
      INSERT INTO users 
      (name, email, password) VALUES 
      ('${name}', '${email}', '${hashPassword}', '${categories.join(",")}')
    `;
  }

  return `
    INSERT INTO users 
    (name, email, password) VALUES 
    ('${name}', '${email}', '${hashPassword}')
  `;
};

const updateUsersDto = (fields) => {
  const { id, name, email, categories } = fields;

  if (categories) {
    return `
      UPDATE users SET 
      name = '${name}', 
      email = '${email}', 
      category_id = '${categories.join(",")}'
      WHERE id = '${id}'
    `;
  }

  return `
    UPDATE users SET 
    name = '${name}', 
    email = '${email}'
    WHERE id = '${id}'
  `;
};

const getAllUsers = async () => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, category_id, created_at, updated_at FROM users"
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getUsersByEmail = async (email) => {
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, created_at, updated_at FROM users WHERE id = '${id}'`
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const createUser = async (fields) => {
  try {
    const query = await createUsersDto(fields);

    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, fields) => {
  try {
    const query = updateUsersDto({ id, ...fields });
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    await pool.query(`DELETE FROM users WHERE id = '${id}'`);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsersByEmail,
};
