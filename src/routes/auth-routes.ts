import express from 'express'
import AuthController from '../app/controllers/AuthController'

const router = express.Router()

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.delete('/logout', AuthController.logout)
router.get('/refresh_token', AuthController.refreshToken)

export default router
