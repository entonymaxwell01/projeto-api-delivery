const User = require("../models/User");
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

  async updateUser(req, res) {
    try {
      const { nome, email, cpf } = req.body;
      if (!nome || !email || !cpf) {
        return res
          .status(400)
          .json({ error: "Campos obrigatórios não preenchidos" });
      }
      userUpdate = await UserService.update(req.params.id, nome, email, cpf);
      return res
        .status(200)
        .json({ userUpdate, message: "Usuário atualizado com sucesso" });
    } catch (error) {
      if (error.message === "Usuário não encontrado") {
        return res.status(404).json({ error: "Usuário não encontrado" });
      } else if (
        error.message === "E-mail ou CPF já estão em uso por outro usuário"
      ) {
        return res
          .status(409)
          .json({ error: "E-mail ou CPF já estão em uso por outro usuário" });
      }
      return res
        .status(500)
        .json({ error, error: "Erro ao atualizar usuário" });
    }
  },
};
