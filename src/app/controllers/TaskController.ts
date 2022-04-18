import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TaskController {
    //---------------- USER ----------------
    // POST /tasks/:id/tasks_detail/store
    async createTaskDetail(req: Request, res: Response): Promise<void> {
        const taskId = +req.params.id;
        const { nameTaskDetail } = req.body;

        try {
            const taskDetail = await prisma.taskDetail.create({
                data: {
                    nameTaskDetail,
                    taskId,
                },
            });

            res.json(taskDetail);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    // GET /tasks/:id
    async getTaskById(req: Request, res: Response): Promise<void> {
        try {
            const id = +req.params.id;
            const task = await prisma.task.findUnique({
                where: {
                    id: id,
                },
                include: {
                    tasksDetail: true,
                },
            });

            res.json(task);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    // PUT /tasks/:id
    async updateTaskById(req: Request, res: Response): Promise<void> {
        try {
            const id = +req.params.id;
            const { nameTask, deadline, description } = req.body;

            const task = await prisma.task.update({
                where: {
                    id: id,
                },
                data: {
                    nameTask,
                    deadline,
                    description,
                },
            });

            res.json(task);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    // DELETE /tasks/:id
    async getAllTasksDetailByTask(req: Request, res: Response): Promise<void> {
        try {
            const id = +req.params.id;
            const tasksDetail = await prisma.taskDetail.findMany({
                where: {
                    taskId: id,
                },
            });

            res.json(tasksDetail);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    // GET /tasks/:id/tasks-detail/all
    async deleteTaskById(req: Request, res: Response): Promise<void> {
        try {
            const taskId = +req.params.id;

            const task = await prisma.task.delete({
                where: {
                    id: taskId,
                },
            });

            res.json(task);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    //---------------- ADMIN ----------------
    // GET /tasks/all
    async getAllTasks(req: Request, res: Response): Promise<void> {
        try {
            const tasks = await prisma.task.findMany({
                include: { tasksDetail: true },
            });

            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

export default new TaskController();
