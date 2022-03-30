import express from 'express'
import { authorizationToken } from '../app/middleware/authorization'
import TaskController from '../app/controllers/TaskController'

const router = express.Router()
//---------------- USER ----------------
router.post('/store', authorizationToken, TaskController.createTask)
router.post('/:id/tasks_detail/store', authorizationToken, TaskController.createTaskDetail)
router.get('/:id', authorizationToken, TaskController.getTaskById)
router.put('/:id', authorizationToken, TaskController.updateTaskById)
router.delete('/:id', authorizationToken, TaskController.deleteTaskById)
//---------------- ADMIN ----------------
router.get('/all', authorizationToken, TaskController.getAllTasks)

export default router
