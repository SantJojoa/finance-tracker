import express from 'express'
import cors from 'cors'
import transactionRoutes from './routes/transaction.routes'
import categoryRoutes from './routes/category.routes'
import accountRoutes from './routes/account.route'
import userRoutes from './routes/user.route'
import paymentMethodRoutes from './routes/paymentMethod.routes'
import tagRoutes from './routes/tag.routes'
import recurringTransactionRoutes from './routes/recurringTransaction.routes'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'API is running' })
})

//Routes
// TODO: Agregar rutas aquí
app.use('/api/transactions', transactionRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/accounts', accountRoutes)
app.use('/api/users', userRoutes)
app.use('/api/payment-methods', paymentMethodRoutes)
app.use('/api/tags', tagRoutes)
app.use('/api/recurring-transactions', recurringTransactionRoutes)


export default app