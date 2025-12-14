import { type ButtonHTMLAttributes, type ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `
    relative overflow-hidden
    backdrop-blur-xl
    border border-white/20
    transition-all duration-300
    font-medium
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:scale-100
    hover:scale-[1.02] active:scale-[0.98]
    shadow-lg hover:shadow-xl
    cursor-pointer
  `

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-6 py-2.5 text-base rounded-lg',
    lg: 'px-8 py-3 text-lg rounded-xl',
  }

  const variantStyles = {
    primary: `
      bg-primary hover:bg-primary-hover
      text-dark-bg
      border-primary
      shadow-[0_0_20px_rgba(43,238,91,0.3)]
      hover:shadow-[0_0_30px_rgba(43,238,91,0.5)]
      font-bold
    `,
    secondary: `
      bg-gradient-to-br from-gray-500/10 to-gray-600/10
      hover:from-gray-500/20 hover:to-gray-600/20
      text-gray-100
      border-gray-400/30
    `,
    danger: `
      bg-gradient-to-br from-red-500/20 to-rose-600/20
      hover:from-red-500/30 hover:to-rose-600/30
      text-red-100
      border-red-400/30
    `,
    success: `
      bg-gradient-to-br from-green-500/20 to-emerald-600/20
      hover:from-green-500/30 hover:to-emerald-600/30
      text-green-100
      border-green-400/30
    `,
  }

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {/* Glass reflection effect */}
      <span className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />

      <span className="relative z-10">{children}</span>
    </button>
  )
}