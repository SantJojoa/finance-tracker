import { Request, Response } from "express";
import { categoryService } from "../services/category.service";

export class CategoryController {

    async getAll(req: Request, res: Response) {
        try {
            const category = await categoryService.getAll()
            res.json(category)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Failed to fetch categories' })
        }
    }

    async getByCategoryId(req: Request, res: Response) {
        try {
            const { id } = req.params
            const category = await categoryService.getById(id)

            if (!category) {
                return res.status(404).json({ error: 'Category not found' })
            }

            res.json(category)
        } catch (error) {
            console.error(error)
            res.status(400).json({ error: 'Failed to fetch category' })
        }
    }

    async getByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.query
            if (!userId || typeof userId !== 'string') {
                return res.status(400).json({ error: 'Invalid userId or missing userId' })
            }

            const categories = await categoryService.getByUserId(userId)
            res.json(categories)
        } catch (error) {
            console.error(error)
            res.status(400).json({ error: 'Failed to fetch categories' })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const category = await categoryService.create(req.body)
            res.status(201).json(category)
        } catch (error) {
            console.error(error)
            res.status(400).json({ error: 'Failed to create category' })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            const category = await categoryService.delete(id)
            res.status(204).send()
        } catch (error) {
            console.error(error)
            res.status(400).json({ error: 'Failed to delete category' })
        }
    }
}

export const categoryController = new CategoryController()