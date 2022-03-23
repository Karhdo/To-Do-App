import express from "express";
import { authorizationToken } from "../app/middleware/authorization";
import TaskController from "../app/controllers/TaskController";

const router = express.Router();

router.post("/", authorizationToken, TaskController.store);
router.get("/all", authorizationToken, TaskController.getAllTasks);
router.get("/:task_id", authorizationToken, TaskController.getTaskById);
router.delete("/:task_id", authorizationToken, TaskController.deleteTaskById);

export default router;
