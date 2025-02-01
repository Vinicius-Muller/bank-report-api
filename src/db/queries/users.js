const { encryptPassword } = require("../../helpers/encription");
const pool = require("../index");

const createUsersDto = async (fields) => {
  const { name, email, password } = fields;
  const hashPassword = await encryptPassword(password);

  return `
    INSERT INTO users 
    (name, email, password) VALUES 
    ('${name}', '${email}', '${hashPassword}')
  `;
};

const updateUsersDto = async (fields) => {
  const { id, name, email } = fields;

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
      `
        SELECT 
          U.id, 
          U.name, 
          U.email, 
          U.updated_at, 
          U.created_at, 

          C.id AS category_id,
          C.title AS category_title,
          C.color AS category_color,
          C.updated_at AS category_updated_at,
          C.created_at AS category_created_at
        FROM 
          users AS U
        LEFT JOIN 
          categories AS C ON C.user_id = U.id;
      `
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

const resetUsersPassword = async (id, password) => {
  const hashPassword = await encryptPassword(password);

  try {
    await pool.query(`
      UPDATE users SET 
      password = '${hashPassword}'
      WHERE id = '${id}'
    `);
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
  resetUsersPassword,
};
