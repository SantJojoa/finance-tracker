import { prisma } from "../lib/prisma";

export class TransactionService {
    async getAllByUserId(userId: string) {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
            },
        })
        return transactions
    }


    async create(data: {
        amount: number,
        type: 'income' | 'expense',
        description?: string,
        currency: string,
        date?: Date,
        userId: string,
        categoryId: string,
        paymentMethodId: string,
        accountId?: string,
    }) {
        const transactions = await prisma.transaction.create({
            data: {
                amount: data.amount,
                type: data.type,
                description: data.description,
                currency: data.currency || 'COP',
                date: data.date || new Date(),
                userId: data.userId,
                categoryId: data.categoryId,
                paymentMethodId: data.paymentMethodId,
                accountId: data.accountId,
            },
            include: {
                category: true,
                paymentMethod: true,
                account: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    }
                }
            }
        })
        return transactions

    }

    async getById(userId: string) {
        const transactions = await prisma.transaction.findUnique({
            where: {
                id: userId,
            },
        })
        return transactions
    }

    async delete(id: string) {
        const transactions = await prisma.transaction.delete({
            where: {
                id,
            }
        })
        return transactions
    }
}

export const transactionService = new TransactionService()
