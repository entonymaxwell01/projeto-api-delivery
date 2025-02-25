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
 *     UserNotFoundResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Usuário não encontrado"
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
 *                 $ref: '#/components/schemas/User'  # <--- Esquema reutilizável
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

router.put("/update/:id", authMiddleware, UserController.updateUser);

module.exports = router;
