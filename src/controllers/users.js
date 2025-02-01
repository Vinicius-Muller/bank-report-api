const {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
  resetUsersPassword,
} = require("../db/queries/users.js");

const createUsers = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const groupUsers = (users) => {
  if (!users.length) return;

  const groupedUsers = users.reduce((acc, row) => {
    const {
      id,
      name,
      category_id,
      category_title,
      category_color,
      category_updated_at,
      category_created_at,
    } = row;

    if (!acc[id]) {
      acc[id] = {
        id,
        name,
        email: row.email,
        updated_at: row.updated_at,
        created_at: row.created_at,
        categories: [],
      };
    }

    if (category_id) {
      acc[id].categories.push({
        category_id,
        category_title,
        category_color,
        category_updated_at,
        category_created_at,
      });
    }

    return acc;
  }, {});

  return Object.values(groupedUsers);
};

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).json(groupUsers(users));
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedUser = await updateUser(id, updatedData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    await resetUsersPassword(id, password);
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createUsers,
  getUsers,
  deleteUsers,
  updateUsers,
  getSingleUser,
  resetPassword,
};
