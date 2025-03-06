const Usuario = require("./Usuario");
const Cliente = require("./Cliente");
const Pedido = require("./Pedido");
const Endereco = require("./Endereco");
const Avaliacao = require("./Avaliacao");

Cliente.belongsTo(Usuario, { foreignKey: "id" });
Cliente.hasMany(Pedido, { foreignKey: "cliente_id" });
Cliente.hasMany(Endereco, { foreignKey: "cliente_id" });
Cliente.hasMany(Avaliacao, { foreignKey: "cliente_id" });

Pedido.belongsTo(Cliente, { foreignKey: "cliente_id" });
Pedido.hasMany(Avaliacao, { foreignKey: "pedido_id" });

Endereco.belongsTo(Cliente, { foreignKey: "cliente_id" });

Avaliacao.belongsTo(Pedido, { foreignKey: "pedido_id" });
Avaliacao.belongsTo(Cliente, { foreignKey: "cliente_id" });

module.exports = { Usuario, Cliente, Pedido, Endereco, Avaliacao };
