const AuthService = require("../services/AuthService");
const UserService = require("../services/UserService");

module.exports = {
  async register(req, res) {
    try {
      const { nome, email, cpf, password } = req.body;

      const user = await UserService.register(nome, email, cpf, password);
      return res
        .status(201)
        .json({ user, message: "Usuário cadastrado com sucesso" });
    } catch (err) {
      if (err.message === "Usuário já cadastrado") {
        return res.status(409).json({ error: err.message });
      }
      return res.status(500).json({ error: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      return res.status(200).json({ token });
    } catch (err) {
      if (err.message === "Usuário não encontrado") {
        return res.status(404).json({ error: err.message });
      } else if (err.message === "Credenciais incorretas") {
        return res.status(401).json({ error: err.message });
      } else {
        return res.status(500).json({ error: err.message });
      }
    }
  },
};
