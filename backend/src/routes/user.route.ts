import Router from "express";
import { userController } from "../controllers/user.controller";

const router = Router()

router.get('/', userController.getAll.bind(userController));
router.get('/:id', userController.getByUserId.bind(userController));
router.post('/', userController.create.bind(userController));
router.delete('/:id', userController.delete.bind(userController));

export default router