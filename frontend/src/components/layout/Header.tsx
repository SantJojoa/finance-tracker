import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import { Menu, X, Wallet, LogOut, User as UserIcon } from 'lucide-react'
import { useAuth } from "@/context/AuthContext";

import Container from "../ui/Container";
import Button from '../Button'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { user, signOut } = useAuth()
    const navigate = useNavigate()

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-dark-border bg-dark-bg/80 backdrop-blur-md">
            <Container>
                <div className="flex items-center justify-between py-4">
                    <Link to='/' className="flex items-center gap-2 cursor-pointer select-none">

                        <div className="size-8 flex items-center justify-center rounded-lg bg-primary/20 text-primary">
                            <Wallet className="size-5" />
                        </div>
                        <h2 className="text-xl font-bold">Monely</h2>

                    </Link>

                    {/* Desktop Navigation COLOCAR HIDDEN EN NAV*/}

                    <nav className=" hidden md:flex items-center gap-8">
                        {user ? (
                            <>
                                <Link to='/dashboard' className="text-sm font-medium hover:text-primary transition-colors">
                                    Dashboard
                                </Link>
                                <Link to="/transactions" className="text-sm font-medium hover:text-primary transition-colors">
                                    Transacciones
                                </Link>
                            </>
                        ) : (
                            <>
                                <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Funciones</a>
                                <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Precios</a>
                                <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">Sobre Nosotros</a>
                            </>
                        )}

                    </nav>

                    {/*CTA*/}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <div className="hidden sm:flex items-center gap-3">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-surface border border-dark-border">
                                        <UserIcon className="size-4 text-primary" />
                                        <span className="text-sm">{user.email}</span>
                                    </div>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center gap-2 text-sm font-medium text-text-dim hover:text-red-500 transition-colors cursor-pointer"
                                    >
                                        <LogOut className="size-4" />
                                        Salir
                                    </button>
                                </div>
                            </>
                        ) :
                            (<>
                                <Link to="/login" className="hidden sm:block text-sm font-medium hover:text-primary transition-colors">
                                    Iniciar Sesión
                                </Link>
                                <Link to='/register'>
                                    <Button variant="primary" size="md" className="hidden sm:flex" >
                                        Registrarse
                                    </Button>
                                </Link>
                            </>)}


                        {/* Mobile Menu*/}

                        <button
                            className="md:hidden text-white hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu*/}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-3 border-t border-dark-border animate-in slide-in-from-top">
                        {user ? (<>
                            <Link to='/dashboard' className="block text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
                            <Link to='/transactions' className="block text-sm font-medium hover:text-primary transition-colors">Transacciones</Link>
                            <div className="pt-2 border-t border-dark-border">
                                <p className="text-xs text-text-dim mb-2">{user.email}</p>
                                <button onClick={handleSignOut} className="flex items-center gap-2 text-sm font-medium text-red-500">
                                    <LogOut className="size-4" />
                                    Salir
                                </button>
                            </div>

                        </>)
                            :
                            (<><a href="#features" className="block text-sm font-medium hover:text-primary transition-colors">
                                Funciones
                            </a>
                                <a href="#pricing" className="block text-sm font-medium hover:text-primary transition-colors">
                                    Precios
                                </a>
                                <a href="#about" className="block text-sm font-medium hover:text-primary transition-colors">
                                    Sobre Nosotros
                                </a>
                                <Link to="/login" className="block text-sm font-medium hover:text-primary transition-colors">
                                    Iniciar Sesión
                                </Link>
                                <Link to='/register'>
                                    <Button variant="primary" size="md" className="w-full">
                                        Registrarse
                                    </Button>
                                </Link>
                            </>)}


                    </div>
                )
                }
            </Container>

        </header>
    );
}