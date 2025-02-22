const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const UserController = require("../controllers/UserController");

const router = express.Router();

router.get("/:id", authMiddleware, UserController.getUserById);
// router.put("/:id", authMiddleware, UserController.updateUser);

module.exports = router;
