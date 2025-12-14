import { Router } from "express";
import { tagController } from "../controllers/tag.controller";

const router = Router();

router.get('/', tagController.getAll.bind(tagController));
router.get('/user', tagController.getByUserId.bind(tagController));
router.get('/:id', tagController.getById.bind(tagController));
router.post('/', tagController.create.bind(tagController));
router.delete('/:id', tagController.delete.bind(tagController));

export default router;
