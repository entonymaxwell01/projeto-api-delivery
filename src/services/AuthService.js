const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthService = {
  async login(email, password) {
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error("Credenciais incorretas");
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return token;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = AuthService;
