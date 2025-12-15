import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import Button from '@/components/Button'
import Input from '@/components/ui/Input'
import Container from '@/components/ui/Container'

import { useAuth } from '@/context/AuthContext'

export default function Login() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const { signIn } = useAuth()
    const [apiError, setApiError] = useState('')
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formData, setFormdata] = useState({
        email: '',
        password: ''
    })




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormdata(prev => ({ ...prev, [name]: value }))
        setErrors(prev => ({ ...prev, [name]: '' }))
        setApiError('')
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.email.trim()) {
            newErrors.email = 'El correo electrónico es requerido'
        }

        if (!formData.password.trim()) {
            newErrors.password = 'La contraseña es requerida'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }



    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsLoading(true)
        setApiError('')

        const { error } = await signIn(formData.email, formData.password)
        if (error) {
            setApiError(error.message)
            setIsLoading(false)
        } else {
            alert('Bienvenido')
            navigate('/dashboard')
        }
        console.log('Login:', { formData })
        setTimeout(() => setIsLoading(false), 1000)
    }

    return (
        <div className="min-h-screen bg-dark-bg text-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <Container className="max-w-[480px] z-10">
                <div className="flex flex-col gap-8">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl md:text-4xl font-extrabold">
                            Bienvenido de nuevo
                        </h1>
                        <p className="text-text-dim text-base">
                            Ingresa tus credenciales para acceder a tu dashboard financiero.
                        </p>
                    </div>

                    {/* Login Form Card */}
                    <div className="bg-dark-surface border border-dark-border rounded-xl p-6 sm:p-8 backdrop-blur-xl shadow-lg">
                        {apiError && (
                            <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                                {apiError}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            {/* Email */}
                            <Input
                                name='email'
                                type="email"
                                autoComplete='email'
                                label="Correo Electrónico"
                                placeholder="nombre@ejemplo.com"
                                icon={<Mail className="size-5" />}
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                required
                            />

                            {/* Password */}
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium">Contraseña</label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>
                                <Input
                                    name='password'
                                    autoComplete='current-password'
                                    className=' cursor-pointer'
                                    type="password"
                                    placeholder="Ingresa tu contraseña"
                                    icon={<Lock className="size-5" />}
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                disabled={isLoading}
                                className="w-full mt-2"
                            >
                                <span className="flex items-center gap-2">
                                    {isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                                    {!isLoading && <ArrowRight className="size-5" />}
                                </span>
                            </Button>

                            {/* Divider */}
                            <div className="relative flex py-2 items-center">
                                <div className="grow border-t border-dark-border" />
                                <span className="shrink mx-4 text-xs font-medium text-text-dim uppercase tracking-wider">
                                    O continuar con
                                </span>
                                <div className="grow border-t border-dark-border" />
                            </div>

                            {/* Social Login Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 h-11 rounded-lg border border-dark-border bg-dark-surface hover:bg-dark-elevated transition-colors text-sm font-semibold"
                                >
                                    <img
                                        src="https://www.google.com/favicon.ico"
                                        alt="Google"
                                        className="w-5 h-5"
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
                        </form>
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-center text-sm text-text-dim">
                        No tienes una cuenta?{' '}
                        <Link to="/register" className="text-primary hover:text-primary-hover font-semibold transition-colors">
                            Regístrate
                        </Link>
                    </p>

                    {/* Terms */}
                    <p className="text-center text-xs text-text-dim">
                        Al iniciar sesión, aceptas nuestros{' '}
                        <Link to="/terms" className="hover:text-white transition-colors">
                            Términos de Servicio
                        </Link>
                        {' '}y{' '}
                        <Link to="/privacy" className="hover:text-white transition-colors">
                            Política de Privacidad
                        </Link>
                        .
                    </p>
                </div>
            </Container>
        </div>
    )
}