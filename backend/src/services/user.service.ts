import { prisma } from "../lib/prisma"

export class UserService {
    async getAll() {
        const users = await prisma.user.findMany()
        return users
    }

    async getById(userId: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return user
    }

    async create(data: {
        name: string,
        email: string,
    }) {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
            }
        })
        return user
    }

    async delete(userId: string) {
        const user = await prisma.user.delete({
            where: {
                id: userId
            }
        })
        return user
    }
}

export const userService = new UserService()