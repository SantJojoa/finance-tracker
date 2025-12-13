import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
    // Limpiar datos existentes (opcional - útil para desarrollo)
    console.log('🗑️  Limpiando base de datos...')
    await prisma.transaction.deleteMany()
    await prisma.recurringTransaction.deleteMany()
    await prisma.tag.deleteMany()
    await prisma.category.deleteMany()
    await prisma.paymentMethod.deleteMany()
    await prisma.account.deleteMany()
    await prisma.user.deleteMany()

    // Usuarios
    console.log('👤 Creando usuarios...')
    const santiago = await prisma.user.create({
        data: {
            email: 'santiago.jojoan@gmail.com',
            name: 'Santiago Jojoa',
        }
    })

    const camila = await prisma.user.create({
        data: {
            email: 'camila.arturo@gmail.com',
            name: 'Camila Arturo'
        }
    })

    console.log('✅ Usuarios creados:', { santiago: santiago.name, camila: camila.name })

    // Cuenta de Santiago
    console.log('🏦 Creando cuentas...')
    const accountSantiago = await prisma.account.create({
        data: {
            name: 'Cuenta Principal',
            balance: 1000000, // 1 millón inicial
            userId: santiago.id
        }
    })

    console.log('✅ Cuenta creada con balance:', accountSantiago.balance)

    // Categorías de Santiago
    console.log('📊 Creando categorías...')
    const categories = await prisma.category.createMany({
        data: [
            {
                name: 'Comida',
                type: 'expense',
                color: '#FF6B6B',
                icon: '🍔',
                userId: santiago.id
            },
            {
                name: 'Transporte',
                type: 'expense',
                color: '#4ECDC4',
                icon: '🚗',
                userId: santiago.id
            },
            {
                name: 'Entretenimiento',
                type: 'expense',
                color: '#95E1D3',
                icon: '🎮',
                userId: santiago.id
            },
            {
                name: 'Salario',
                type: 'income',
                color: '#38A169',
                icon: '💰',
                userId: santiago.id
            }
        ]
    })

    console.log('✅ Categorías creadas:', categories.count)

    // Obtener las categorías creadas para usarlas en transacciones
    const food = await prisma.category.findFirst({
        where: { name: 'Comida', userId: santiago.id }
    })
    const transport = await prisma.category.findFirst({
        where: { name: 'Transporte', userId: santiago.id }
    })
    const salary = await prisma.category.findFirst({
        where: { name: 'Salario', userId: santiago.id }
    })

    // Métodos de pago
    console.log('💳 Creando métodos de pago...')
    const paymentMethods = await prisma.paymentMethod.createMany({
        data: [
            { name: 'Efectivo', type: 'cash', userId: santiago.id },
            { name: 'Nequi', type: 'digital_wallet', userId: santiago.id },
            { name: 'Tarjeta Débito', type: 'debit_card', userId: santiago.id },
        ]
    })

    console.log('✅ Métodos de pago creados:', paymentMethods.count)

    // Obtener métodos de pago
    const cash = await prisma.paymentMethod.findFirst({
        where: { name: 'Efectivo', userId: santiago.id }
    })
    const nequi = await prisma.paymentMethod.findFirst({
        where: { name: 'Nequi', userId: santiago.id }
    })
    const card = await prisma.paymentMethod.findFirst({
        where: { name: 'Tarjeta Débito', userId: santiago.id }
    })

    // Transacciones
    console.log('💰 Creando transacciones...')
    await prisma.transaction.createMany({
        data: [
            {
                amount: 2000000,
                type: 'income',
                description: 'Pago de salario mensual',
                userId: santiago.id,
                categoryId: salary!.id,
                paymentMethodId: card!.id,
                accountId: accountSantiago.id,
                date: new Date('2024-12-01')
            },
            {
                amount: 50000,
                type: 'expense',
                description: 'Almuerzo restaurante',
                userId: santiago.id,
                categoryId: food!.id,
                paymentMethodId: nequi!.id,
                accountId: accountSantiago.id,
                date: new Date('2024-12-05')
            },
            {
                amount: 20000,
                type: 'expense',
                description: 'Taxi al trabajo',
                userId: santiago.id,
                categoryId: transport!.id,
                paymentMethodId: cash!.id,
                accountId: accountSantiago.id,
                date: new Date('2024-12-06')
            },
            {
                amount: 35000,
                type: 'expense',
                description: 'Cena con amigos',
                userId: santiago.id,
                categoryId: food!.id,
                paymentMethodId: card!.id,
                accountId: accountSantiago.id,
                date: new Date('2024-12-10')
            }
        ]
    })

    console.log('✅ Transacciones creadas')
    console.log('🎉 Seed completado exitosamente!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error('❌ Error:', e)
        await prisma.$disconnect()
        process.exit(1)
    })