import { Wallet, Instagram, Linkedin, Github } from "lucide-react";
import Container from "../ui/Container";

export default function Footer() {
    return (
        <footer className="w-full border-t border-dark-border bg-dark-bg">
            <Container className="py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <div className="size-6 flex items-center justify-center rounded-lg bg-primary/20 text-primary">
                                <Wallet className="size-4" />
                            </div>
                            <h2 className="text-lg font-bold">Finance Tracker</h2>
                        </div>
                        <p className="text-text-dim text-sm leading-relaxed">Ayudamos a las personas a transformar su relación con el dinero usando tecnología y educación financiera.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a
                                target="_blank"
                                href="https://www.instagram.com/santiago.jojoa_/"
                                className="text-text-dim hover:text-primary transition-colors"
                                aria-label="Twitter"
                            >
                                <Instagram className="size-5" />
                            </a>
                            <a
                                target="_blank"
                                href="https://www.linkedin.com/in/santiago-jojoa-845a1936a/"
                                className="text-text-dim hover:text-primary transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="size-5" />
                            </a>
                            <a
                                target="_blank"
                                href="https://github.com/SantJojoa"
                                className="text-text-dim hover:text-primary transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="size-5" />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-sm uppercase tracking-wider">Producto</h3>
                        <div className="flex flex-col gap-2">
                            <a href="#features" className="text-text-dim hover:text-primary transition-colors text-sm">Funciones</a>
                            <a href="#pricing" className="text-text-dim hover:text-primary transition-colors text-sm">Precios</a>
                            <a href="#integrations" className="text-text-dim hover:text-primary transition-colors text-sm">Integraciones</a>
                            <a href="#changelog" className="text-text-dim hover:text-primary transition-colors text-sm">Historial de cambios</a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-sm uppercase tracking-wider">Compañía</h3>
                        <div className="flex flex-col gap-2">
                            <a href="#about" className="text-text-dim hover:text-primary transition-colors text-sm">Sobre Nosotros</a>
                            <a href="#about" className="text-text-dim hover:text-primary transition-colors text-sm">Contacto</a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-sm uppercase tracking-wider">Mantente Informado</h3>
                        <p className="text-text-dim text-xs">
                            Obtén los últimos tips financieros y las ultimas actualizaciones de nuestro producto
                        </p>
                        <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Ingresa tu email"
                                className="h-10 rounded-lg bg-dark-surface border border-dark-border text-white text-sm px-3 
                            focus:outline-none focus:border-primary placeholder:text-text-dim/50 
                            transition-colors"
                            />
                            <button
                                type="submit"
                                className="h-10 rounded-lg bg-primary hover:bg-primary-hover text-dark-bg 
                            font-bold text-sm transition-colors"
                            >
                                Suscribirse
                            </button>
                        </form>
                    </div>
                </div>
            </Container>

            <div className="w-full border-t border-dark-border py-4">
                <Container>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-dim">
                        <p>© {new Date().getFullYear()} Finance Tracker. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#privacy" className="hover:text-primary transition-colors">
                                Política de privacidad                            </a>
                            <a href="#terms" className="hover:text-primary transition-colors">
                                Términos de Servicio
                            </a>
                        </div>
                    </div>
                </Container>
            </div>

        </footer>
    )
}