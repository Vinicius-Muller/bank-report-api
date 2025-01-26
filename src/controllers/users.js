const { getUsers } = require("../db/queries/users.js");

const signIn = async () => {
  await getUsers();
};

module.exports = { signIn };
