const ClienteService = require("../services/ClienteService");

module.exports = {
  async register(req, res) {
    try {
      const { nome, email, cpf, password } = req.body;

      if (!nome || !email || !cpf || !password) {
        return res
          .status(400)
          .json({ error: "Campos obrigatórios não preenchidos" });
      }

      const cliente = await ClienteService.create(nome, email, cpf, password);
      return res.status(201).json(cliente);
    } catch (error) {
      if (error.message === "Usuário já cadastrado") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  },
};
