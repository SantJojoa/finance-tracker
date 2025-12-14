import { Request, Response } from "express";
import { accountService } from "../services/account.service";

export class AccountController {
    async getAll(req: Request, res: Response) {
        try {
            const accounts = await accountService.getAll()
            res.json(accounts)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Failed to fetch accounts' })
        }
    }


    async getByAccountId(req: Request, res: Response) {
        try {
            const { id } = req.params
            const account = await accountService.getById(id)

            if (!account) {
                return res.status(404).json({ error: 'Account not found' })
            }

            res.json(account)

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Failed to fetch account' })
        }
    }

    async getByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.query
            if (!userId || typeof userId !== 'string') {
                return res.status(400).json({ error: 'Invalid userId or missing userId' })
            }

            const accounts = await accountService.getByUserId(userId)
            res.json(accounts)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Failed to fetch accounts' })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const account = await accountService.create(req.body)
            res.status(201).json(account)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Failed to create account' })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            const account = await accountService.delete(id)
            res.status(204).send()
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Failed to delete account' })
        }
    }
}

export const accountController = new AccountController()