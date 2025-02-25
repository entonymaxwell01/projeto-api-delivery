const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const UserController = require("../controllers/UserController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, UserController.getAllUsers);
router.get("/:id", authMiddleware, adminMiddleware, UserController.getUserById);
// router.put("/:id", authMiddleware, UserController.updateUser);

module.exports = router;
