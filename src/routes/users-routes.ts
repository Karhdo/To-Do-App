import express from 'express'
import { authorizationToken } from '../app/middleware/authorization'
import UserController from '../app/controllers/UserController'

const router = express.Router()
//---------------- USER ----------------
router.get('/me', authorizationToken, UserController.getCurrentUser)
router.get('/me/task/all', authorizationToken, UserController.getAllTasksByCurrentUser)

//---------------- ADMIN ----------------
router.get('/all', authorizationToken, UserController.getAllUsers)
router.get('/:id', authorizationToken, UserController.getUsersById)
router.delete('/:id', authorizationToken, UserController.deleteUserById)

export default router
