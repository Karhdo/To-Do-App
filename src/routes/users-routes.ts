import express from 'express'
import { authorizationToken } from '../app/middleware/authorization'
import UserController from '../app/controllers/UserController'

const router = express.Router()

router.get('/all', authorizationToken, UserController.getAllUsers)
router.get('/:user_id', authorizationToken, UserController.getUsersById)
router.get('/:user_id/task/all', authorizationToken, UserController.getAllTasksByUserId)
router.delete('/:user_id', authorizationToken, UserController.deleteUserById)

export default router
