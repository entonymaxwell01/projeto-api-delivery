const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController.js");

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
