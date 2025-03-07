const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const ClienteController = require("../controllers/ClienteController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/", ClienteController.register);

module.exports = router;
