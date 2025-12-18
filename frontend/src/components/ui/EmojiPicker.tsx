interface EmojiPickerProps {
    value: string
    onChange: (emoji: string) => void
    label?: string
}

const EMOJIS = [
    '💰', '💵', '💳', '🏦', '💼', '📊', '📈', '📉',
    '🍔', '🍕', '🍜', '☕', '🍺', '🛒', '🏪', '🏬',
    '🚗', '🚕', '🚌', '🚎', '✈️', '🚂', '⛽', '🅿️',
    '🏠', '🏡', '🏢', '🏥', '🏫', '⚡', '💡', '🔧',
    '👕', '👔', '👗', '👠', '💄', '💅', '✂️', '🎬',
    '🎮', '🎯', '🎲', '🎸', '🎹', '🎤', '🎧', '📱',
    '💻', '⌚', '📷', '📚', '✏️', '📝', '🎓', '💊',
    '🏋️', '⚽', '🏀', '🎾', '🎿', '🏊', '🧘', '🐕',
]

export default function EmojiPicker({ value, onChange, label }: EmojiPickerProps) {
    return (
        <div>
            {label && <label className="block text-sm font-medium mb-2">{label}</label>}
            <div className="grid grid-cols-8 gap-2 max-h-[200px] overflow-y-auto p-2 bg-dark-surface border border-dark-border rounded-lg">
                {EMOJIS.map((emoji) => (
                    <button
                        key={emoji}
                        type="button"
                        onClick={() => onChange(emoji)}
                        className={`size-10 rounded-lg flex items-center justify-center text-2xl transition-all hover:bg-dark-elevated ${value === emoji ? 'bg-primary/20 ring-2 ring-primary' : ''
                            }`}
                        title={emoji}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
            <div className="mt-3 flex items-center gap-3">
                <div className="size-10 rounded-lg bg-dark-surface border border-dark-border flex items-center justify-center text-2xl">
                    {value || '?'}
                </div>
                <span className="text-sm text-text-dim">Seleccionado: {value || 'Ninguno'}</span>
            </div>
        </div>
    )
}