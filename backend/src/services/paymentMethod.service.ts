import { prisma } from "../lib/prisma";

type PaymentMethodType = 'cash' | 'debit_card' | 'digital_wallet' | 'credit_card';

export class PaymentMethodService {

    async getAll() {
        const paymentMethods = await prisma.paymentMethod.findMany({
            orderBy: { name: 'asc' },
        });
        return paymentMethods;
    }

    async getById(id: string) {
        const paymentMethod = await prisma.paymentMethod.findUnique({
            where: { id },
        });
        return paymentMethod;
    }

    async getByUserId(userId: string) {
        const paymentMethods = await prisma.paymentMethod.findMany({
            where: { userId },
            orderBy: { name: 'asc' },
        });
        return paymentMethods;
    }

    async create(data: {
        name: string;
        type: PaymentMethodType;
        userId: string;
    }) {
        const paymentMethod = await prisma.paymentMethod.create({
            data: {
                name: data.name,
                type: data.type,
                userId: data.userId,
            },
        });
        return paymentMethod;
    }

    async delete(id: string) {
        const paymentMethod = await prisma.paymentMethod.delete({
            where: { id },
        });
        return paymentMethod;
    }
}

export const paymentMethodService = new PaymentMethodService();
