import express from 'express'
import { authorizationToken } from '../app/middleware/authorization'
import TaskController from '../app/controllers/TaskDetailController'

const router = express.Router()

//---------------- USER ----------------
router.put('/:id', authorizationToken, TaskController.updateTaskDetailById)
router.delete('/:id', authorizationToken, TaskController.deleteTaskDetailById)
//---------------- ADMIN ----------------
router.get('/all', authorizationToken, TaskController.getAllTasksDetail)

export default router
