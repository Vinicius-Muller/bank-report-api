const { getUsers } = require("../db/queries/users.js");

const createUsers = async (_, res) => {
  const result = await getUsers();
  res.json(result);
};

module.exports = { createUsers };
