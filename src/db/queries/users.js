const pool = require("../index");

const getUsers = async () => {
  const query = "SELECT * FROM users";
  const result = await pool.query(query);
  return result.rows;
};

const getUserById = async (id) => {
  const query = "SELECT * FROM users WHERE id = $1";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const createUser = async (name, email) => {
  const query = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *";
  const result = await pool.query(query, [name, email]);
  return result.rows[0];
};

const updateUser = async (id, name, email) => {
  const query =
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *";
  const result = await pool.query(query, [name, email, id]);
  return result.rows[0];
};

const deleteUser = async (id) => {
  const query = "DELETE FROM users WHERE id = $1";
  await pool.query(query, [id]);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
