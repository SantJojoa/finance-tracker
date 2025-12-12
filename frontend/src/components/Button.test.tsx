import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
    it('renders with children text', () => {
        render(<Button>Click me</Button>)
        expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('calls onClick when clicked', async () => {
        const handleClick = vi.fn()
        const user = userEvent.setup()

        render(<Button onClick={handleClick}>Click me</Button>)
        await user.click(screen.getByRole('button', { name: 'Click me' }))

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('applies primary variant styles by default', () => {
        render(<Button>Primary</Button>)
        const button = screen.getByRole('button', { name: 'Primary' })
        expect(button).toHaveClass('from-blue-500/20')
    })

    it('applies secondary variant styles', () => {
        render(<Button variant="secondary">Secondary</Button>)
        const button = screen.getByRole('button', { name: 'Secondary' })
        expect(button).toHaveClass('from-gray-500/10')
    })

    it('applies danger variant styles', () => {
        render(<Button variant="danger">Danger</Button>)
        const button = screen.getByRole('button', { name: 'Danger' })
        expect(button).toHaveClass('from-red-500/20')
    })

    it('disables button when disabled prop is true', () => {
        render(<Button disabled>Disabled</Button>)
        const button = screen.getByRole('button', { name: 'Disabled' })
        expect(button).toBeDisabled()
    })

    it('does not call onClick when disabled', async () => {
        const handleClick = vi.fn()
        const user = userEvent.setup()

        render(<Button onClick={handleClick} disabled>Disabled</Button>)
        await user.click(screen.getByRole('button', { name: 'Disabled' }))

        expect(handleClick).not.toHaveBeenCalled()
    })

    it('applies different size styles', () => {
        const { rerender } = render(<Button size="sm">Small</Button>)
        const buttonSm = screen.getByRole('button', { name: 'Small' })
        expect(buttonSm).toHaveClass('px-3', 'py-1.5', 'text-sm')

        rerender(<Button size="lg">Large</Button>)
        const buttonLg = screen.getByRole('button', { name: 'Large' })
        expect(buttonLg).toHaveClass('px-6', 'py-3', 'text-lg')
    })
})