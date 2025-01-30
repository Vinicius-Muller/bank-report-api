const {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
} = require("../db/queries/users.js");

const createUsers = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
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

module.exports = {
  createUsers,
  getUsers,
  deleteUsers,
  updateUsers,
  getSingleUser,
};
