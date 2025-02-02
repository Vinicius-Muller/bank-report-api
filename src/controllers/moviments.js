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

const groupMovements = (movements) => {
  if (!movements.length) return [];

  return movements.map((movement) => {
    const {
      id: movement_id,
      description,
      amount,
      date,
      type,
      created_at,
      updated_at,
      category_id,
      category_title,
      category_color,
      category_created_at,
      category_updated_at,
      user_id,
      user_name,
      user_email,
      user_created_at,
      user_updated_at,
    } = movement;

    return {
      movement_id,
      description,
      amount,
      date,
      type,
      created_at,
      updated_at,
      category: {
        category_id,
        category_title,
        category_color,
        category_created_at,
        category_updated_at,
      },
      user: {
        user_id,
        user_name,
        user_email,
        user_created_at,
        user_updated_at,
      },
    };
  });
};

const getMoviments = async (req, res) => {
  try {
    const moviments = await getAllMoviments();

    return groupMovements(moviments);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getSingleMoviments = async (req, res) => {
  try {
    const { id } = req.params;
    const moviment = await getMovimentById(id);

    return groupMovements(moviment);
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
