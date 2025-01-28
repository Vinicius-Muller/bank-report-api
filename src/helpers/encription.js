const bcrypt = require("bcrypt");

const encryptPassword = async (plainPassword) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
};

const matchPassword = async (plainText, encryptPassword) => {
  const isMatch = await bcrypt.compare(plainText, encryptPassword);
  if (isMatch) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  encryptPassword,
  matchPassword,
};
