import { prisma } from "../lib/prisma";

export class TagService {

    async getAll() {
        const tags = await prisma.tag.findMany({
            orderBy: { name: 'asc' },
        });
        return tags;
    }

    async getById(id: string) {
        const tag = await prisma.tag.findUnique({
            where: { id },
        });
        return tag;
    }

    async getByUserId(userId: string) {
        const tags = await prisma.tag.findMany({
            where: { userId },
            orderBy: { name: 'asc' },
        });
        return tags;
    }

    async create(data: {
        name: string;
        userId: string;
    }) {
        const tag = await prisma.tag.create({
            data: {
                name: data.name,
                userId: data.userId,
            },
        });
        return tag;
    }

    async delete(id: string) {
        const tag = await prisma.tag.delete({
            where: { id },
        });
        return tag;
    }
}

export const tagService = new TagService();
