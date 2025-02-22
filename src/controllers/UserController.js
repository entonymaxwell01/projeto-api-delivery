const User = require("../models/User");

module.exports = {
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: ["id", "nome", "email", "cpf", "role"],
      });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  },
};
