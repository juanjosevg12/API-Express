const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", userController.createUsuario);
router.get("/", authMiddleware, userController.getUsuarios); 
router.get("/:id", authMiddleware, userController.getUsuarioById);

module.exports = router;
