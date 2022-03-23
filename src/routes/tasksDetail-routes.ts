import express from "express";
import { authorizationToken } from "../app/middleware/authorization";
import TaskController from "../app/controllers/TaskDetailController";

const router = express.Router();

router.post("/", authorizationToken, TaskController.store);
router.get("/all", authorizationToken, TaskController.getAllTasksDetail);
router.get("/all/:task_id", authorizationToken, TaskController.getTasksDetailByTaskId);
router.delete("/:taskDetail_id", authorizationToken, TaskController.deleteTaskDetailById);

export default router;
