import { Router } from "express";
import { recurringTransactionController } from "../controllers/recurringTransaction.controller";

const router = Router();

router.get('/', recurringTransactionController.getAll.bind(recurringTransactionController));
router.get('/user', recurringTransactionController.getByUserId.bind(recurringTransactionController));
router.get('/:id', recurringTransactionController.getById.bind(recurringTransactionController));
router.post('/', recurringTransactionController.create.bind(recurringTransactionController));
router.delete('/:id', recurringTransactionController.delete.bind(recurringTransactionController));

export default router;
