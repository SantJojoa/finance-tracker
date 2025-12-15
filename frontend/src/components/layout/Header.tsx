import { useState } from "react";
import { Menu, X, Wallet } from 'lucide-react'
import Container from "../ui/Container";
import Button from '../Button'
import { Link } from 'react-router-dom'
export default function Header() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <header className="sticky top-0 z-50 w-full border-b border-dark-border bg-dark-bg/80 backdrop-blur-md">
            <Container>
                <div className="flex items-center justify-between py-4">
                    {/* TODO: AQUÍ VA EL LOGO*/}
                    <div className="flex items-center gap-2 cursor-pointer select-none">
                        <div className="size-8 flex items-center justify-center rounded-lg bg-primary/20 text-primary">
                            <Wallet className="size-5" />
                        </div>
                        <h2 className="text-xl font-bold">Monely</h2>
                    </div>

                    {/* Desktop Navigation COLOCAR HIDDEN EN NAV*/}

                    <nav className=" hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Funciones</a>
                        <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Precios</a>
                        <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">Sobre Nosotros</a>
                    </nav>

                    {/*CTA*/}
                    <div className="flex items-center gap-4">
                        <Link to='/register'>
                            <Button variant="primary" size="md" className="hidden sm:flex" >
                                Registrarse
                            </Button>
                        </Link>

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
                        <a href="#features" className="block text-sm font-medium hover:text-primary transition-colors">
                            Funciones
                        </a>
                        <a href="#pricing" className="block text-sm font-medium hover:text-primary transition-colors">
                            Precios
                        </a>
                        <a href="#about" className="block text-sm font-medium hover:text-primary transition-colors">
                            Sobre Nosotros
                        </a>
                        <Button variant="primary" size="md" className="w-full">
                            Registrarse
                        </Button>
                    </div>
                )
                }
            </Container>

        </header>
    );
}