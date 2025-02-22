const app = require("./app");
const PORT = process.env.PORT || 3003;
const { connectDB } = require("./config/database");

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });
