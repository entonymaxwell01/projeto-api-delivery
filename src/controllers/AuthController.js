const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(req, res) {
    try {
      const { nome, email, cpf, password } = req.body;

      const userExist = await User.findOne({ where: { email: email } });
      if (userExist) {
        return res.status(400).json({ error: "Usuário já cadastrado" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        nome,
        email,
        cpf,
        password: hashedPassword,
      });
      return res
        .status(201)
        .json({ user, message: "Usuário cadastrado com sucesso" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Erro ao cadastrar o usuário" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ error: "Senha incorreta" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(200).json({ token });
    } catch (err) {
      console.log("Erro no login:", err);
      return res.status(500).json({ error: "Não foi possível fazer o login}" });
    }
  },
};
