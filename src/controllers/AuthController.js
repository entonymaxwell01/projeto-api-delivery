const AuthService = require("../services/AuthService");
const UserService = require("../services/UserService");

module.exports = {
  async register(req, res) {
    try {
      const { nome, email, cpf, password } = req.body;

      if (!nome || !email || !cpf || !password) {
        return res
          .status(400)
          .json({ error: "Campos obrigatórios não preenchidos" });
      }

      const user = await UserService.register(nome, email, cpf, password);

      const userResponse = {
        id: user.id,
        nome: user.nome,
        email: user.email,
        cpf: user.cpf,
      };

      return res
        .status(201)
        .json({ userResponse, message: "Usuário cadastrado com sucesso" });
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
