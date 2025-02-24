const User = require("../models/User");

const UserService = {
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
