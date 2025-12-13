import { Request, Response } from "express";
import { transactionService } from "../services/transaction.service";

export class TransactionController {

    async getAll(req: Request, res: Response) {
        try {
            const { userId } = req.query

            if (!userId || typeof userId !== 'string') {
                return res.status(400).json({ error: 'userId is required' })
            }

            const transactions = await transactionService.getAllByUserId(userId)
            res.json(transactions)
        } catch (error) {
            console.error(error)
            res.status(400).json({ error: 'Failed to fetch transactions' })
        }
    }


    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const transaction = await transactionService.getById(id)

            if (!transaction) {
                return res.status(404).json({ error: 'Transaction not found' })
            }
        } catch (error) {
            console.error(error)
            res.status(400).json({ error: 'Failed to fetch transaction' })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const transaction = await transactionService.create(req.body)
            res.status(201).json(transaction)
        } catch (error) {
            console.error(error)
            res.status(400).json({ error: 'Failed to create transaction' })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            const transaction = await transactionService.delete(id)
            res.status(204).send()
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Failed to delete transaction' })
        }
    }

}


export const transactionController = new TransactionController()
