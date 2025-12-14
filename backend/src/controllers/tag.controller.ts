import { Request, Response } from "express";
import { tagService } from "../services/tag.service";

export class TagController {

    async getAll(req: Request, res: Response) {
        try {
            const tags = await tagService.getAll();
            res.json(tags);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch tags' });
        }
    }

    async getByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.query;
            if (!userId || typeof userId !== 'string') {
                return res.status(400).json({ error: 'Invalid userId or missing userId' });
            }

            const tags = await tagService.getByUserId(userId);
            res.json(tags);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch tags' });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const tag = await tagService.getById(id);

            if (!tag) {
                return res.status(404).json({ error: 'Tag not found' });
            }

            res.json(tag);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch tag' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const tag = await tagService.create(req.body);
            res.status(201).json(tag);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create tag' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await tagService.delete(id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete tag' });
        }
    }
}

export const tagController = new TagController();
