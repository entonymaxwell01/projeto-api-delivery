const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const UserService = {
  async register(nome, email, cpf, password) {
    try {
      const userExist = await User.findOne({ where: { email: email } });
      if (userExist) {
        throw new Error("Usuário já cadastrado");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      if (!nome || !email || !cpf || !password) {
        throw new Error("Campos obrigatórios não preenchidos");
      }

      const user = await User.create({
        nome,
        email,
        cpf,
        password: hashedPassword,
      });

      return user;
    } catch (err) {
      throw err;
    }
  },

  async findAll() {
    try {
      const users = await User.findAll({
        attributes: ["id", "nome", "email", "cpf", "role"],
      });
      return users;
    } catch (err) {
      throw err;
    }
  },

  async findUserById(id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (err) {
      throw err;
    }
  },

  async update(id, nome, email, cpf) {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      // Adicione validação de campos únicos
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email }, { cpf }],
          [Op.not]: { id: id },
        },
      });

      if (existingUser) {
        throw new Error("E-mail ou CPF já estão em uso por outro usuário");
      }

      const updatedUser = await user.update({
        nome,
        email,
        cpf,
      });

      return {
        data: {
          id: updatedUser.id,
          nome: updatedUser.nome,
          email: updatedUser.email,
          cpf: updatedUser.cpf,
        },
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async delete(id) {
    try {
      const userExist = await User.findByPk(id);
      if (!userExist) {
        throw new Error("Usuário não encontrado");
      }

      const userDeleted = await userExist.destroy({ where: { id: id } });

      return {
        data: {
          id: userExist.id,
          nome: userExist.nome,
          cpf: userExist.cpf,
          email: userExist.email,
        },
      };
    } catch (err) {
      throw err;
    }
  },
};

module.exports = UserService;
