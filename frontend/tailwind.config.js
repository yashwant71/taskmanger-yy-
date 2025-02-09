/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,htm,vue}"],
  theme: {
    extend: {
      colors: {
        // Background colors
        "bg-main": "#ffffff",
        "bg-hover": "#f3f4f6",
        "bg-accent": "#f8fafc",

        // Text colors
        "text-primary": "#1f2937",
        "text-secondary": "#4b5563",
        "text-muted": "#9ca3af",

        // Border colors
        "border-default": "#e5e7eb",
        "border-focus": "#3b82f6",

        // Status colors
        "status-low": "var(--color-status-low)",
        "status-medium": "var(--color-status-medium)",
        "status-high": "var(--color-status-high)",
      },
    },
  },
  plugins: [],
};
