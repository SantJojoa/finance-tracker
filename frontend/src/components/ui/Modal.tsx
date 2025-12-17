import { X } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md'
}: ModalProps) {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!isOpen) return null

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    }


    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />
            <div
                className={`relative w-full ${sizeClasses[size]} bg-dark-surface border border-dark-border rounded-xl shadow-2xl overflow-hidden`}
            >
                <div className='flex items-center justify-between px-6 py-4 border-b border-dark-border'>
                    <h2 className='text-xl font-bold'>{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-dark-elevated transition-colors"
                    >
                        <X className="size-5" />
                    </button>
                </div>
                <div className='p-6 max-h-[calc(100vh-200px)] overflow-y-auto'>
                    {children}
                </div>
            </div>
        </div>
    )
}