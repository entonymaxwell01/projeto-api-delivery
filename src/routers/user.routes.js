const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const UserController = require("../controllers/UserController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     InvalidTokenResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Token Inválido"
 *     UnauthorizedResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Usuário não autorizado"
 *     InvalidFieldsError:
 *       type: object
 *       properties:
 *         error:
 *          type: string
 *          example: "Campos obrigatórios não preenchidos"
 *     UserNotFoundResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Usuário não encontrado"
 *     ConflictError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Este email ou CPF já está em uso por outro usuário"
 *     UserUpdateResponse:
 *       type: object
 *       properties:
 *         userUpdate:
 *           type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: "João ninguem"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "example@example.com"
 *                 cpf:
 *                   type: string
 *                   example: "12345678901"
 *         message:
 *           type: string
 *           example: "Usuário atualizado com sucesso"
 *       required:
 *         - userUpdate
 *         - message
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     tags: [Usuários]
 *     summary: Retorna a lista de usuários (Restrito a administradores)
 *     description: Retorna todos os usuários cadastrados no sistema. **Apenas administradores podem acessar esta rota.**
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       400:
 *         $ref: '#/components/responses/InvalidTokenError'
 *       404:
 *         $ref: '#/components/responses/UsersNotFoundError'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *         cpf:
 *           type: string
 *
 *   responses:
 *     UnauthorizedError:
 *       description: Usuário não autorizado
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UnauthorizedResponse'
 *     InvalidTokenError:
 *       description: Token inválido
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InvalidTokenResponse'
 *     UsersNotFoundError:
 *       description: Nenhum usuário encontrado
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserNotFoundResponse'
 *
 */
router.get("/", authMiddleware, adminMiddleware, UserController.getAllUsers);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     tags: [Usuários]
 *     summary: Retorna um único usuário (Restrito a administradores)
 *     description: Retorna um único usuário buscado pelo id. **Apenas administradores podem acessar esta rota.**
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser buscado
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT no formato Bearer {token}. **Apenas administradores têm permissão para acessar esta rota.**
 *     responses:
 *       200:
 *         description: Usuário retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *                 cpf:
 *                   type: string
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotFoundResponse'
 *       401:
 *         description: Usuário não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 *       400:
 *         description: Token inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidTokenResponse'
 */
router.get("/:id", authMiddleware, adminMiddleware, UserController.getUserById);

/**
 * @swagger
 * /usuarios/update/{id}:
 *   put:
 *     tags: [Usuários]
 *     summary: Atualiza os dados de um usuário
 *     description: Atualiza as informações do usuário pelo ID (Acesso restrito a administradores)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *           example:
 *             nome: "João ninguem"
 *             email: "example@example.com"
 *             cpf: "12345678901"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserUpdateResponse'
 *       400:
 *         description: Campos obrigatórios não preenchidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidFieldsError'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotFoundResponse'
 *       409:
 *         description: Conflito de dados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConflictError'
 */

/**
 * @swagger
 * /usuarios/update/{id}:
 *   put:
 *     tags: [Usuários]
 *     summary: Atualiza os dados do próprio usuário
 *     description: Atualiza as informações do usuário autenticado
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser atualizado
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT no formato Bearer {token}
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *           example:
 *             nome: "João ninguem"
 *             email: "example@example.com"
 *             cpf: "12345678901"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserUpdateResponse'
 *       400:
 *         description: Campos obrigatórios não preenchidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidFieldsError'
 *       401:
 *         description: Token inválido ou não fornecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidTokenResponse'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotFoundResponse'
 *       409:
 *         description: Conflito de dados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConflictError'
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     InvalidTokenResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Token inválido ou expirado"
 */
router.put("/update/:id", authMiddleware, UserController.updateUser);

/**
 * @swagger
 * /usuarios/delete/{id}:
 *   delete:
 *     tags: [Usuários]
 *     summary: Deleta um usuário pelo ID (Restrito a administradores)
 *     description: Remove um usuário específico do banco de dados se ele existir **Apenas administradores podem acessar esta rota.**
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser deletado.
 *         schema:
 *           type: integer
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT no formato Bearer {token}
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               message: "Usuário deletado com sucesso"
 *               userDeleted:
 *                 data:
 *                   id: 10
 *                   nome: "João ninguém"
 *                   cpf: "12345678901"
 *                   email: "example@example.com"
 *       404:
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: "Usuário não encontrado"
 *       401:
 *         description: Acesso negado.
 *         content:
 *           application/json:
 *             example:
 *               error: "Acesso negado"
 *       400:
 *         description: Token inválido.
 *         content:
 *           application/json:
 *             example:
 *               error: "Token inválido"
 */

router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  UserController.deleteUser
);

module.exports = router;
