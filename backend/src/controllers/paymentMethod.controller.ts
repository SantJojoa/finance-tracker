import { Request, Response } from "express";
import { paymentMethodService } from "../services/paymentMethod.service";

export class PaymentMethodController {

    async getAll(req: Request, res: Response) {
        try {
            const paymentMethods = await paymentMethodService.getAll();
            res.json(paymentMethods);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch payment methods' });
        }
    }

    async getByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.query;
            if (!userId || typeof userId !== 'string') {
                return res.status(400).json({ error: 'Invalid userId or missing userId' });
            }

            const paymentMethods = await paymentMethodService.getByUserId(userId);
            res.json(paymentMethods);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch payment methods' });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const paymentMethod = await paymentMethodService.getById(id);

            if (!paymentMethod) {
                return res.status(404).json({ error: 'Payment method not found' });
            }

            res.json(paymentMethod);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch payment method' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const paymentMethod = await paymentMethodService.create(req.body);
            res.status(201).json(paymentMethod);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create payment method' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await paymentMethodService.delete(id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete payment method' });
        }
    }
}

export const paymentMethodController = new PaymentMethodController();
