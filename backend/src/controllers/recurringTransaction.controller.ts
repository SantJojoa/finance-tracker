import { Request, Response } from "express";
import { recurringTransactionService } from "../services/recurringTransaction.service";

export class RecurringTransactionController {

    async getAll(req: Request, res: Response) {
        try {
            const recurringTransactions = await recurringTransactionService.getAll();
            res.json(recurringTransactions);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch recurring transactions' });
        }
    }

    async getByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.query;
            if (!userId || typeof userId !== 'string') {
                return res.status(400).json({ error: 'Invalid userId or missing userId' });
            }

            const recurringTransactions = await recurringTransactionService.getByUserId(userId);
            res.json(recurringTransactions);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch recurring transactions' });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const recurringTransaction = await recurringTransactionService.getById(id);

            if (!recurringTransaction) {
                return res.status(404).json({ error: 'Recurring transaction not found' });
            }

            res.json(recurringTransaction);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch recurring transaction' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const recurringTransaction = await recurringTransactionService.create(req.body);
            res.status(201).json(recurringTransaction);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create recurring transaction' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await recurringTransactionService.delete(id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete recurring transaction' });
        }
    }
}

export const recurringTransactionController = new RecurringTransactionController();
