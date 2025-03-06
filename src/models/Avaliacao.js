// src/models/Avaliacao.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const Avaliacao = sequelize.define(
  "Avaliacao",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comentario: {
      type: DataTypes.TEXT,
    },
    num_estrelas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "avaliacoes",
    timestamps: true,
  }
);

module.exports = Avaliacao;
