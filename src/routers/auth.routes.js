const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController.js");

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
 * /auth/register:
 *   post:
 *     tags: [Autenticação]
 *     summary: Realiza cadastro de um novo usuário
 *     description: Cria uma nova conta de usuário no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *           example:
 *             nome: "Luana"
 *             email: "test@teste21.com"
 *             cpf: "12891281289"
 *             password: "senha123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRegistrationResponse'
 *       400:
 *         description: Campos inválidos ou faltantes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidFieldsError'
 *       409:
 *         description: Usuário já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAlreadyExistsError'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegistration:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - cpf
 *         - password
 *       properties:
 *         nome:
 *           type: string
 *           example: "João ninguem"
 *         email:
 *           type: string
 *           format: email
 *           example: "teste@example.com"
 *         cpf:
 *           type: string
 *           example: "12891281289"
 *         password:
 *           type: string
 *           format: password
 *           example: "senha123"
 *
 *     UserRegistrationResponse:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/User'
 *         message:
 *           type: string
 *           example: "Usuário cadastrado com sucesso"
 *
 *     User:
 *       type: object
 *       properties:
 *         role:
 *           type: string
 *           example: "cliente"
 *         id:
 *           type: integer
 *           example: 11
 *         nome:
 *           type: string
 *           example: "João ninguem"
 *         email:
 *           type: string
 *           example: "teste@example.com"
 *         cpf:
 *           type: string
 *           example: "12891281289"
 *
 *     UserAlreadyExistsError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Usuário já cadastrado"
 *
 *     InvalidFieldsError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Campos obrigatórios não preenchidos"
 */
router.post("/register", AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Autenticação]
 *     summary: Autentica um usuário no sistema
 *     description: Retorna um token JWT para acesso às rotas protegidas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *           example:
 *             email: "example@mail.com"
 *             password: "senha123"
 *     responses:
 *       200:
 *         description: Autenticação bem sucedida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginSuccessResponse'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotFoundResponse'
 *       400:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidCredentialsResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "example@mail.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "senha123"
 *
 *     LoginSuccessResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "e1JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQwNTExMTI2LCJleHAiOjE3NDA1MTQ3MjZ9.wU3r9X-x37fksqgaWpWaLy306M6kkM-5ZX_6dmYAOc0"
 *
 *     UserNotFoundResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Usuário não encontrado"
 *
 *     InvalidCredentialsResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Credenciais inválidas"
 */

router.post("/login", AuthController.login);

module.exports = router;
