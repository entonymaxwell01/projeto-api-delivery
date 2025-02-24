const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserService = {
  async register(nome, email, cpf, password) {
    try {
      const userExist = await User.findOne({ where: { email: email } });
      if (userExist) {
        throw new Error("Usuário já cadastrado");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

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
      console.log(err);
    }
  },

  async findUserById(id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = UserService;
