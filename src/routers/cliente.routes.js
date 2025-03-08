const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const ClienteController = require("../controllers/ClienteController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     description: Registra um novo cliente no sistema.
 *     tags:
 *       - Clientes
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - cpf
 *               - password
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João Ninguém"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "example@test.com"
 *               cpf:
 *                 type: string
 *                 example: "12345678901"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "example"
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nome:
 *                   type: string
 *                   example: "Teste"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "example40@test.com"
 *                 cpf:
 *                   type: string
 *                   example: "129891812"
 *                 cliente:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 23
 *                     data_registro:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-09T01:42:37.695Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-09T01:42:37.695Z"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-09T01:42:37.695Z"
 *       400:
 *         description: Erro ao criar cliente (usuário já cadastrado ou campos inválidos).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               UsuarioJaCadastrado:
 *                 summary: Usuário já cadastrado
 *                 value:
 *                   error: "Usuário já cadastrado"
 *               CamposInvalidos:
 *                 summary: Campos obrigatórios não preenchidos
 *                 value:
 *                   error: "Campos obrigatórios não preenchidos"
 */
router.post("/", ClienteController.register);

module.exports = router;
