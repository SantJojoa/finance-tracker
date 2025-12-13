import { Router } from 'express';
import { categoryController } from '../controllers/category.controller'

const router = Router()

router.get('/', categoryController.getAll.bind(categoryController));
router.get('/user', categoryController.getByUserId.bind(categoryController));
router.get('/:id', categoryController.getByCategoryId.bind(categoryController));
router.post('/', categoryController.create.bind(categoryController));
router.delete('/:id', categoryController.delete.bind(categoryController));

export default router