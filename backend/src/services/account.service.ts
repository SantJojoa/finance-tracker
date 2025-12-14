import { prisma } from "../lib/prisma"

export class AccountService {

    async getAll() {
        const accounts = await prisma.account.findMany()
        return accounts
    }

    async getById(accountId: string) {
        const account = await prisma.account.findUnique({
            where: {
                id: accountId
            }
        })
        return account
    }

    async getByUserId(userId: string) {
        const account = await prisma.account.findMany({
            where: {
                userId
            },
            orderBy: {
                name: 'asc'
            }
        })
        return account
    }


    async create(data: {
        name: string,
        balance: number,
        userId: string
    }) {
        const account = await prisma.account.create({
            data: {
                name: data.name,
                balance: data.balance,
                userId: data.userId
            }
        })
        return account
    }

    async delete(id: string) {
        const account = await prisma.account.delete({
            where: {
                id
            }
        })
        return account
    }
}

export const accountService = new AccountService()