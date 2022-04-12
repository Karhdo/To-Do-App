import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TaskDetailController {
    //---------------- USER ----------------
    // PUT tasks-detail/:id
    async updateTaskDetailById(req: Request, res: Response): Promise<void> {
        try {
            const id = +req.params.id;
            const { nameTaskDetail, state } = req.body;

            const taskDetail = await prisma.taskDetail.update({
                where: {
                    id,
                },
                data: {
                    nameTaskDetail,
                    state,
                },
            });

            res.json(taskDetail);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    // DELETE tasks-detail/:id
    async deleteTaskDetailById(req: Request, res: Response): Promise<void> {
        try {
            const id = +req.params.id;

            const taskDetail = await prisma.taskDetail.delete({
                where: {
                    id,
                },
            });

            res.json(taskDetail);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    //---------------- ADMIN ----------------
    // GET tasks-detail/all
    async getAllTasksDetail(req: Request, res: Response): Promise<void> {
        try {
            const tasksDetail = await prisma.taskDetail.findMany();

            res.json(tasksDetail);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

export default new TaskDetailController();
