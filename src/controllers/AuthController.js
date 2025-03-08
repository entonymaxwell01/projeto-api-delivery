const AuthService = require("../services/AuthService");

module.exports = {
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
