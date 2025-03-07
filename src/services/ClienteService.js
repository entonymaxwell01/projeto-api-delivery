const { create } = require("mochawesome-report-generator");
const Cliente = require("../models/Cliente");
const User = require("../models/User");
const UserService = require("./UserService");

const ClienteService = {
  async create(nome, email, cpf, password) {
    try {
      const user = await UserService.register(nome, email, cpf, password);

      if (!user) {
        throw new Error("Erro ao registrar usuário");
      }

      const cliente = await Cliente.create({
        id: user.id,
        data_registro: new Date(),
      });

      return { nome, email, cpf, cliente };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = ClienteService;
