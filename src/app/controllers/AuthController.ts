import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwtTokens } from './../../utils/jwt-helper'

const prisma = new PrismaClient()

class AuthController {
    //POST /auth/register
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { email, password, name } = req.body
            const hashedPassword = await bcrypt.hash(password, 10)

            const user = await prisma.user.create({
                data: {
                    email: email,
                    password: hashedPassword,
                    name: name,
                },
            })

            res.json(user)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    //POST /auth/login
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            })

            if (!user)
                return res.status(401).json({ error: 'Email is incorrect' })

            // Password check
            const validationPassword = await bcrypt.compare(
                password,
                user.password,
            )
            if (!validationPassword)
                return res.status(401).json({ error: 'Password is incorrect' })

            //JWT
            let tokens = jwtTokens(user.id, user.email, user.password)
            res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true })
            res.json(tokens)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    //GET /auth/refresh_token
    async refreshToken(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies.refresh_token
            if (refreshToken == null)
                return res.status(401).json({ error: 'Null refresh token' })
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET as string,
                (error: any, user: any) => {
                    if (error)
                        return res.status(401).json({ error: error.message })

                    let tokens = jwtTokens(user.id, user.email, user.name)
                    res.cookie('refresh_token', tokens.refreshToken, {
                        httpOnly: true,
                    })
                    res.json(tokens)
                },
            )
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    //DELETE /auth/logout
    async logout(req: Request, res: Response) {
        try {
            res.clearCookie('refresh_token')
            return res.status(200).json({ message: 'Logout successfully.' })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}

export default new AuthController()
