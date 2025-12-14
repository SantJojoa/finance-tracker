import { userService } from "../services/user.service";
import { Request, Response } from "express";

export class UserController {

    async getAll(req: Request, res: Response) {
        try {
            const users = await userService.getAll()
            res.json(users)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Failed to fetch users' })
        }
    }

    async getByUserId(req: Request, res: Response) {
        try {
            const { id } = req.params
            const user = await userService.getById(id)
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: 'User not found' })
            }
            res.json(user)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Failed to fetch user' })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const user = await userService.create(req.body)
            res.status(201).json(user)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Failed to create user' })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            const user = await userService.delete(id)
            res.status(204).send()
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Failed to delete user' })
        }
    }
}

export const userController = new UserController()