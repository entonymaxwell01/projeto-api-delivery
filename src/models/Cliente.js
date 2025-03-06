const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const Cliente = sequelize.define(
  "Cliente",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    data_registro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "clientes",
  }
);

module.exports = Cliente;
