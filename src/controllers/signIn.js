const { getUsersByEmail } = require("../db/queries/users.js");
const { matchPassword } = require("../helpers/encription.js");
const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await getUsersByEmail(email);

    if (!users || users.length === 0) {
      return res.status(401).json({ message: "email incorreto" });
    }

    const signedUser = await Promise.all(
      users.find(async (user) => await matchPassword(password, user.password))
    );

    if (!signedUser) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    const accessToken = jwt.sign(
      { userId: signedUser.id, email: signedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      ...signedUser,
      access_token: accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro interno durante o login" });
  }
};

module.exports = { signIn };
