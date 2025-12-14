import { prisma } from "../lib/prisma";

type TransactionType = 'income' | 'expense';
type Frequency = 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly';

export class RecurringTransactionService {

    async getAll() {
        const recurringTransactions = await prisma.recurringTransaction.findMany({
            orderBy: { nextRun: 'asc' },
        });
        return recurringTransactions;
    }

    async getById(id: string) {
        const recurringTransaction = await prisma.recurringTransaction.findUnique({
            where: { id },
        });
        return recurringTransaction;
    }

    async getByUserId(userId: string) {
        const recurringTransactions = await prisma.recurringTransaction.findMany({
            where: { userId },
            orderBy: { nextRun: 'asc' },
        });
        return recurringTransactions;
    }

    async create(data: {
        userId: string;
        amount: number;
        type: TransactionType;
        description?: string;
        categoryId: string;
        paymentMethodId: string;
        accountId?: string;
        frequency: Frequency;
        nextRun: Date;
        isActive?: boolean;
    }) {
        const recurringTransaction = await prisma.recurringTransaction.create({
            data: {
                userId: data.userId,
                amount: data.amount,
                type: data.type,
                description: data.description,
                categoryId: data.categoryId,
                paymentMethodId: data.paymentMethodId,
                accountId: data.accountId,
                frequency: data.frequency,
                nextRun: data.nextRun,
                isActive: data.isActive ?? true,
            },
        });
        return recurringTransaction;
    }

    async delete(id: string) {
        const recurringTransaction = await prisma.recurringTransaction.delete({
            where: { id },
        });
        return recurringTransaction;
    }
}

export const recurringTransactionService = new RecurringTransactionService();
