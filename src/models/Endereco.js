const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const Endereco = sequelize.define(
  "Endereco",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rua: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ponto_de_referencia: {
      type: DataTypes.STRING,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "enderecos",
    timestamps: true,
  }
);

module.exports = Endereco;
