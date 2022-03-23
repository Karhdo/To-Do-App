import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TaskDetailController {
    // POST tasks-detail/store
    async store(req: Request, res: Response): Promise<void> {
        try {
            const { nameTaskDetail, description, taskId } = req.body;

            const taskDetail = await prisma.taskDetail.create({
                data: {
                    nameTaskDetail: nameTaskDetail,
                    description: description,
                    taskId: taskId,
                },
            });

            res.json(taskDetail);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    // GET tasks-detail/all
    async getAllTasksDetail(req: Request, res: Response): Promise<void> {
        try {
            const tasksDetail = await prisma.taskDetail.findMany();

            res.json(tasksDetail);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    // GET tasks-detail/:task_id
    async getTasksDetailByTaskId(req: Request, res: Response): Promise<void> {
        try {
            const taskId = +req.params.task_id;

            const tasksDetail = await prisma.taskDetail.findMany({
                where: {
                    taskId: taskId,
                },
            });

            res.json(tasksDetail);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    // DELETE tasks-detail/:taskDetail_id
    async deleteTaskDetailById(req: Request, res: Response): Promise<void> {
        try {
            const taskDetailId = +req.params.taskDetail_id;

            const taskDetail = await prisma.taskDetail.delete({
                where: {
                    id: taskDetailId,
                },
            });

            res.json(taskDetail);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

export default new TaskDetailController();
