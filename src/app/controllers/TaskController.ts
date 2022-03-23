import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class TaskController {
    // POST /tasks/store
    async store(req: Request, res: Response): Promise<void> {
        try {
            const { nameTask, userId, description, deadline } = req.body

            const task = await prisma.task.create({
                data: {
                    userId: userId,
                    nameTask: nameTask,
                    description: description,
                    deadline: deadline,
                },
            })

            res.json(task)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    // GET /tasks/all
    async getAllTasks(req: Request, res: Response): Promise<void> {
        try {
            const tasks = await prisma.task.findMany({
                include: { tasksDetail: true },
            })

            res.json(tasks)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    // GET /tasks/:task_id
    async getTaskById(req: Request, res: Response): Promise<void> {
        try {
            const id = +req.params.task_id
            const task = await prisma.task.findUnique({
                where: {
                    id: id,
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
    // PUT /tasks/:task_id
    async updateTaskById(req: Request, res: Response): Promise<void> {
        try {
            const id = +req.params.task_id
            const { nameTask, deadline, description } = req.body

            const task = await prisma.task.update({
                where: {
                    id: id,
                },
                data: {
                    nameTask: nameTask,
                    deadline: deadline,
                    description: description,
                },
            })

            res.json(task)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    // DELETE /tasks/:task_id
    async deleteTaskById(req: Request, res: Response): Promise<void> {
        try {
            const taskId = +req.params.task_id

            await prisma.taskDetail.deleteMany({
                where: { taskId: taskId },
            })

            const task = await prisma.task.delete({
                where: {
                    id: taskId,
                },
            })

            res.json(task)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}

export default new TaskController()
