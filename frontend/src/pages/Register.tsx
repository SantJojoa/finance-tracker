import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, ArrowRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/Button'
import Input from '@/components/ui/Input'
import Container from '@/components/ui/Container'

export default function Register() {
    const navigate = useNavigate()
    const { signUp, signInWithGoogle } = useAuth()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [apiError, setApiError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
        setApiError('')
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El correo electrónico es requerido'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El correo electrónico es inválido'
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida'
        } else if (formData.password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres'
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return


        setIsLoading(true)
        setApiError('')

        const { error } = await signUp(formData.email, formData.password, formData.name)

        if (error) {
            setApiError(error.message)
            setIsLoading(false)
        } else {
            alert('Revisa tu correo para confirmar tu cuenta')
            navigate('/login')
        }

        console.log(formData)

        setTimeout(() => {
            setIsLoading(false)
            navigate('/login')
        }, 1000)
    }

    const handleGoogleSignUp = async () => {
        await signInWithGoogle()
    }


    return (
        <div className=' flex items-center justify-center py-12 px-4 relative overflow-hidden min-h-[calc(100vh-120px)]'>
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <Container className='max-w-[480px] z-10'>
                <div className='flex flex-col gap-8'>
                    <div className='text-center space-y-2'>
                        <h1 className='text-3xl md:text-4xl font-extrabold'>
                            Crea Tu Cuenta
                        </h1>
                        <p className='text-text-dim text-base'>
                            Empieza tu camino hacia la libertad financiera hoy.
                        </p>
                    </div>

                    <div className='bg-dark-surface border border-dark-border rounded-xl p-6 sm:p-8 backdrop-blur-xl shadow-lg'>
                        {apiError && (
                            <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                                {apiError}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                            <Input
                                type="text"
                                name="name"
                                label="Nombre"
                                placeholder="Tu nombre"
                                icon={<User className="size-5" />}
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                                required
                            />

                            <Input
                                autoComplete='email'
                                type="email"
                                name="email"
                                label="Correo Electrónico"
                                placeholder="nombre@ejemplo.com"
                                icon={<Mail className="size-5" />}
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                required
                            />

                            <Input
                                autoComplete='new-password'
                                type="password"
                                name="password"
                                label="Contraseña"
                                placeholder="Crea una contraseña fuerte"
                                icon={<Lock className="size-5" />}
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                                helperText={!errors.password ? "Debe tener al menos 8 caracteres" : undefined}
                                required
                            />

                            <Input
                                autoComplete='new-password'
                                type="password"
                                name="confirmPassword"
                                label="Confirmar Contraseña"
                                placeholder="Repite tu contraseña"
                                icon={<Lock className="size-5" />}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={errors.confirmPassword}
                                required
                            />

                            <label className='flex items-start gap-3 cursor-pointer'>
                                <input type="checkbox"
                                    required
                                    className="mt-0.5 size-4 rounded border-dark-border bg-dark-surface text-primary focus:ring-2 focus:ring-primary/50 focus:ring-offset-0"
                                />
                                <span className='text-sm text-text-dim'>
                                    Acepto los{' '}
                                    <Link to="/terms" className='text-white hover:text-primary transition-colors'>
                                        Términos y Condiciones
                                    </Link>
                                    {' '} y la{' '}
                                    <Link to="/privacy" className='text-white hover:text-primary transition-colors'>
                                        Política de Privacidad
                                    </Link>
                                </span>
                            </label>

                            <Button
                                type='submit'
                                variant='primary'
                                size='lg'
                                disabled={isLoading}
                                className='w-full mt-2'
                            >
                                <span className='flex items-center gap-2'>
                                    {isLoading ? 'Creando Cuenta...' : 'Crear Cuenta'}
                                    {!isLoading && <ArrowRight className='size-5' />}
                                </span>
                            </Button>

                            <div className='relative flex py-2 items-center'>
                                <div className='grow border-t border-dark-border'>
                                    <span className='flex shrink mx-4 text-xs font-medium text-text-dim uppercase tracking-wider'>
                                        O inicia sesión con
                                    </span>
                                    <div className='grow border-t border-dark-border' />
                                </div>

                                <div className='grid grid-cols-2 gap-4'>
                                    <button
                                        onClick={handleGoogleSignUp}
                                        type='button'
                                        className='flex items-center justify-center gap-2 h-11 rounded-lg border border-dark-border bg-dark-surface hover:bg-dark-elevated transition-colors text-sm font-semibold'
                                    >
                                        <img
                                            src='https://www.google.com/favicon.ico'
                                            alt='Google'
                                            className='w-5 h-5'
                                        />
                                        Google
                                    </button>
                                    <button
                                        type="button"
                                        className="flex items-center justify-center gap-2 h-11 rounded-lg border border-dark-border bg-dark-surface hover:bg-dark-elevated transition-colors text-sm font-semibold"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                        </svg>
                                        GitHub
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <p className="text-center text-sm text-text-dim">
                        ¿Ya tienes una cuenta?{' '}
                        <Link to="/login" className="text-primary hover:text-primary-hover font-semibold transition-colors">
                            Inicia Sesión
                        </Link>
                    </p>
                </div>
            </Container>
        </div>
    )
}