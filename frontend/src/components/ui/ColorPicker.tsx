interface ColorPickerProps {
    value: string
    onChange: (color: string) => void
    label?: string
}

const COLORS = [
    '#ef4444', // red
    '#f97316', // orange
    '#f59e0b', // amber
    '#eab308', // yellow
    '#84cc16', // lime
    '#22c55e', // green
    '#10b981', // emerald
    '#14b8a6', // teal
    '#06b6d4', // cyan
    '#0ea5e9', // sky
    '#3b82f6', // blue
    '#6366f1', // indigo
    '#8b5cf6', // violet
    '#a855f7', // purple
    '#d946ef', // fuchsia
    '#ec4899', // pink
    '#f43f5e', // rose
    '#64748b', // slate
]

export default function ColorPicker({ value, onChange, label }: ColorPickerProps) {
    return (
        <div>
            {label && <label className="block text-sm font-medium mb-2">{label}</label>}
            <div className="grid grid-cols-9 gap-2">
                {COLORS.map((color) => (
                    <button
                        key={color}
                        type="button"
                        onClick={() => onChange(color)}
                        className={`size-8 rounded-lg transition-all ${value === color ? 'ring-2 ring-primary ring-offset-2 ring-offset-dark-bg scale-110' : 'hover:scale:110'
                            }`}
                        style={{ backgroundColor: color }}
                        title={color}
                    />
                ))}
            </div>
            <div className="mt-3 flex items-center gap-3">
                <div
                    className="size-10 rounded-lg border border-dark-border"
                    style={{ backgroundColor: value }}

                />
                <span className="text-sm text-text-dim">{value}</span>

            </div>
        </div>
    )
}