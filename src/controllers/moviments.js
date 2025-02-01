const {
  getAllMoviments,
  getMovimentById,
  createMoviment,
  deleteMoviment,
  updateMoviment,
} = require("../db/queries/moviments.js");

const createMoviments = async (req, res) => {
  try {
    const newMoviment = await createMoviment(req.body);
    res.status(200).json(newMoviment);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getMoviments = async (req, res) => {
  try {
    const moviments = await getAllMoviments();

    res.status(200).json(moviments);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getSingleMoviments = async (req, res) => {
  try {
    const { id } = req.params;
    const moviment = await getMovimentById(id);
    res.status(200).json(moviment);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteMoviments = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteMoviment(id);
    res.status(200).json({ message: "Movimentação deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateMoviments = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedMoviment = await updateMoviment(id, updatedData);
    res.status(200).json(updatedMoviment);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createMoviments,
  getMoviments,
  getSingleMoviments,
  updateMoviments,
  deleteMoviments,
};
