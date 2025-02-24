const UserService = require("../services/UserService");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await UserService.findAll();
      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  },
  async getUserById(req, res) {
    try {
      const user = await UserService.findUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  },
};
