/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                light: {
                    "primary": "#46B2EC",
                    "primary-content": "#F8FAFC",
                    "secondary": "#166534",
                    "accent": "#052E16",
                    "neutral": "#020617",
                    "neutral-content": "#F8FAFC",
                    "info": "#17A2B8",
                    "success": "#177E47",
                    "warning": "#FCD34D",
                    "error": "#F43F5E",
                    "base-100": "#F8FAFC",
                    "base-200": "#F2F3F5",
                    "base-300": "#ECECEE",
                },
            },
            {
                dark: {
                    "primary": "#46B2EC",
                    "primary-content": "#222",
                    "secondary": "#052E16",
                    "accent": "#169445",
                    "neutral": "#1F293B",
                    "neutral-content": "#F8FAFC",
                    "info": "#17A2B8",
                    "success": "#27AB5E",
                    "warning": "#DBA958",
                    "error": "#F33F3F",
                    "base-100": "#0E172A",
                    "base-200": "#0d1325",
                    "base-300": "#334155",
                },
            },
        ],
    },
};
