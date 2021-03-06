import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

class UserController {
    //---------------- USER ----------------
    // GET /users/me
    async getCurrentUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user.id;

            const users = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    tasks: { include: { tasksDetail: true } },
                },
            });

            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    // GET /users/me/task/all
    async getAllTasksByCurrentUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user.id;

            const task = await prisma.task.findMany({
                where: {
                    userId,
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
    // POST /users/me/tasks/store
    async createTaskByCurrentUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user.id;
            const { nameTask, description, deadline } = req.body;

            const task = await prisma.task.create({
                data: {
                    nameTask,
                    description,
                    deadline,
                    userId,
                },
            });

            res.json(task);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    // PUT /users/me/update
    async updateCurrentUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user.id;
            const { name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    //---------------- ADMIN ----------------
    // GET /users/all
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await prisma.user.findMany({
                include: {
                    tasks: { include: { tasksDetail: true } },
                },
            });

            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    // GET /users/:id
    async getUsersById(req: Request, res: Response): Promise<void> {
        try {
            const id = +req.params.id;

            const users = await prisma.user.findUnique({
                where: {
                    id,
                },
                include: {
                    tasks: true,
                },
            });

            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    // DELETE /users/:id
    async deleteUserById(req: Request, res: Response): Promise<void> {
        try {
            const id = +req.params.id;

            const user = await prisma.user.delete({
                where: {
                    id,
                },
            });

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

export default new UserController();
