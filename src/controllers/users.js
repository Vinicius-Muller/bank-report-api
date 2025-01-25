const { getUsers } = require("../db/queries/users");

const signIn = async () => {
  await getUsers();
};

module.exports = { signIn };
