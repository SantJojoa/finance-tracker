import { type InputHTMLAttributes, forwardRef, useState } from "react"
import { Eye, EyeOff } from 'lucide-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    error?: string,
    icon?: React.ReactNode,
    helperText?: string
}
const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, helperText, type, className = '', ...props }, ref) => {

        const [showPassword, setShowPassword] = useState(false)
        const isPassword = type === 'password'
        const inputType = isPassword && showPassword ? 'text' : type

        return (
            <div className="flex flex-col gap-2">
                {label && (
                    <label className="text-sm font-medium">
                        {label}
                    </label>
                )}

                <div className="relative flex items-center">
                    <input
                        ref={ref}
                        type={inputType}
                        className={`w-full h-12 px-4 rounded-lg
                            bg-dark-surface border border-dark-border
                            text-white placeholder:text-text-dim
                            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                            transition-all
                            ${icon ? 'pr-12' : ''}
                            ${isPassword ? 'pr-12' : ''}
                            ${error ? 'border-red-500 focus:ring-red-500/50' : ''}
                            ${className}
                            `}
                        {...props}
                    />

                    {isPassword ? (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 text-text-dim hover:text-white transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff className="size-5" />
                            ) : (
                                <Eye className="size-5" />
                            )}
                        </button>
                    ) : icon ? (
                        <div className="absolute right-4 text-text-dim pointer-events-none">
                            {icon}
                        </div>
                    ) : null}
                </div>
                {(helperText || error) && (
                    <p className={`text-sm ${error ? 'text-red-500' : 'text-text-dim'}`}>
                        {error || helperText}
                    </p>
                )}

            </div>
        )

    }
)
Input.displayName = 'Input'

export default Input