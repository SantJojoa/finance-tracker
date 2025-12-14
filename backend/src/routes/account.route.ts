import { Router } from 'express'
import { accountController } from '../controllers/account.controller'
import { categoryController } from '../controllers/category.controller'

const router = Router()

router.get('/', accountController.getAll.bind(accountController))
router.get('/user', accountController.getByUserId.bind(accountController))
router.get('/:id', accountController.getByAccountId.bind(accountController))
router.post('/', accountController.create.bind(accountController))
router.delete('/:id', categoryController.delete.bind(categoryController))

export default router