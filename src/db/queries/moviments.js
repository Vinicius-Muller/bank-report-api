const pool = require("../index");

const createMovimentsDto = (fields) => {
  const { description, amount, date, type, user_id, category_id } = fields;

  return `
    INSERT INTO moviments 
    (description, amount, date, type, user_id, category_id) VALUES 
    ('${description}', '${amount}', '${date}', '${type}', '${user_id}', '${category_id}');
  `;
};

const searchMovimentQuery = (date) => {
  if(date) {
    return `
      SELECT 
        M.*, 

        U.id AS user_id,
        U.name AS user_name,
        U.email AS user_email,
        U.updated_at AS user_updated_at,
        U.created_at AS user_created_at,

        C.id AS category_id,
        C.title AS category_title,
        C.color AS category_color,
        C.created_at AS category_created_at,
        C.updated_at AS category_updated_at
      FROM 
        moviments AS M
      LEFT JOIN
        users AS U ON U.id = M.user_id
      LEFT JOIN 
        categories AS C ON C.id = M.category_id
      WHERE M.date = '${date}';
    `
  }

  return `
    SELECT 
      M.*, 

      U.id AS user_id,
      U.name AS user_name,
      U.email AS user_email,
      U.updated_at AS user_updated_at,
      U.created_at AS user_created_at,

      C.id AS category_id,
      C.title AS category_title,
      C.color AS category_color,
      C.created_at AS category_created_at,
      C.updated_at AS category_updated_at
    FROM 
      moviments AS M
    LEFT JOIN
      users AS U ON U.id = M.user_id
    LEFT JOIN 
      categories AS C ON C.id = M.category_id;
  `
}

const updateMovimentsDto = (id, fields) => {
  const { description, amount, date, type, user_id, category_id } = fields;

  return `
    UPDATE moviments SET 
    description = '${description}', 
    amount = '${amount}',
    date = '${date}',
    type = '${type}',
    user_id = '${user_id}',
    category_id = '${category_id}'
    WHERE id = '${id}';
  `;
};

const getAllMoviments = async (date) => {
  try {
    const query = searchMovimentQuery(date);
    const result = await pool.query(query);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getMovimentById = async (id) => {
  try {
    const result = await pool.query(
      `
				SELECT 
          M.*, 

          U.id AS user_id,
          U.name AS user_name,
          U.email AS user_email,
          U.updated_at AS user_updated_at,
          U.created_at AS user_created_at,

          C.id AS category_id,
          C.title AS category_title,
          C.color AS category_color,
          C.created_at AS category_created_at,
          C.updated_at AS category_updated_at
        FROM 
          moviments AS M
				LEFT JOIN
        	users AS U ON U.id = M.user_id
        LEFT JOIN 
          categories AS C ON C.id = M.category_id
				WHERE M.id = '${id}';
			`
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getTotalBalance = async (id) => {
  const result = await pool.query(`
    SELECT type, SUM(amount) AS total 
      FROM moviments
    WHERE user_id = '${id}'
    GROUP BY type;
  `);

  return result.rows;
}

const createMoviment = async (fields) => {
  try {
    const query = createMovimentsDto(fields);

    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const updateMoviment = async (id, fields) => {
  try {
    const query = updateMovimentsDto(id, fields);
    const result = await pool.query(query);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteMoviment = async (id) => {
  try {
    await pool.query(`DELETE FROM moviments WHERE id = '${id}'`);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllMoviments,
  getMovimentById,
  createMoviment,
  updateMoviment,
  deleteMoviment,
  getTotalBalance
};
