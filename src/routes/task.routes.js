const express = require("express");
const router = express.Router();
const tareaController = require("../controllers/task.controller");
const authMiddleware = require("../middlewares/auth.middleware"); 


router.use(authMiddleware);
router.get("/", tareaController.getTareas);
router.get("/:id", tareaController.getTareaById);
router.post("/", tareaController.createTarea);
router.put("/:id", tareaController.updateTarea);
router.delete("/:id", tareaController.deleteTarea);
router.get("/user/:userId", tareaController.getTareasByUser);

module.exports = router;
