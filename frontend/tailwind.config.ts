export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'dark-bg': '#0a0a0f',
                'dark-surface': '#13131a',
                'dark-elevated': '#1a1a24',
                'glass-white': 'rgba(255, 255, 255, 0.1)',
                'glass-border': 'rgba(255, 255, 255, 0.2)',
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}