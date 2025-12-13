import { prisma } from "../lib/prisma"

export class CategoryService {

    async getAll() {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            }
        })
        return categories
    }

    async getById(categoryId: string) {
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId
            }
        })

        return category
    }

    async getByUserId(userId: string) {
        const categories = await prisma.category.findMany({
            where: {
                userId
            },
            orderBy: {
                name: 'asc'
            }
        })
        return categories
    }

    async create(data: {
        name: string,
        type: 'income' | 'expense',
        color?: string,
        icon?: string,
        userId: string
    }) {
        const category = await prisma.category.create({
            data: {
                name: data.name,
                type: data.type,
                color: data.color,
                icon: data.icon,
                userId: data.userId
            },

        })
        return category
    }

    async delete(id: string) {
        const category = await prisma.category.delete({
            where: {
                id
            }
        })
        return category
    }
}

export const categoryService = new CategoryService()