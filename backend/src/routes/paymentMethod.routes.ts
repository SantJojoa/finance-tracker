import { Router } from "express";
import { paymentMethodController } from "../controllers/paymentMethod.controller";

const router = Router();

router.get('/', paymentMethodController.getAll.bind(paymentMethodController));
router.get('/user', paymentMethodController.getByUserId.bind(paymentMethodController));
router.get('/:id', paymentMethodController.getById.bind(paymentMethodController));
router.post('/', paymentMethodController.create.bind(paymentMethodController));
router.delete('/:id', paymentMethodController.delete.bind(paymentMethodController));

export default router;
