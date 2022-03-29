import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class UserController {
    //ADMIN
    // GET /users/all
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await prisma.user.findMany({
                include: {
                    tasks: { include: { tasksDetail: true } },
                },
            })

            res.json(users)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    // GET /users/:user_id
    async getUsersById(req: Request, res: Response): Promise<void> {
        try {
            // @ts-ignore
            const id = req.params.user_id || req.user.id

            const users = await prisma.user.findUnique({
                where: {
                    id: +id,
                },
                include: {
                    tasks: true,
                },
            })

            res.json(users)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    // GET /users/:user_id/task/all
    async getAllTasksByUserId(req: Request, res: Response): Promise<void> {
        try {
            const id = +req.params.user_id || req.user.id

            const task = await prisma.task.findMany({
                where: {
                    userId: id,
                },
                include: {
                    tasksDetail: true,
                },
            })

            res.json(task)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    // DELETE /users/:user_id
    async deleteUserById(req: Request, res: Response): Promise<void> {
        try {
            const id = +req.params.user_id

            await prisma.task.deleteMany({
                where: {
                    userId: id,
                },
            })

            const user = await prisma.user.delete({
                where: {
                    id: id,
                },
            })

            res.json(user)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}

export default new UserController()
