/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      scrollbar: {
        thin: {
          width: "8px",
          height: "8px",
        },
        thumb: {
          "background-color": "#888",
          "border-radius": "10px",
        },
        track: {
          "background-color": "#f1f1f1",
          "border-radius": "10px",
        },
      },
      variants: {
        scrollbar: ["rounded"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".border-border": {
          borderColor: "var(--border)",
        },
      };
      addUtilities(
        newUtilities,
        ["responsive", "hover"],
        {
          ".scrollbar-thin": {
            "scrollbar-width": "thin",
          },
          ".scrollbar-thumb": {
            "--scrollbar-color": "#888 #f1f1f1",
            "scrollbar-color": "#888 #f1f1f1",
          },
          ".scrollbar-track": {
            "scrollbar-track-color": "#f1f1f1",
          },
          ".scrollbar-rounded": {
            "scrollbar-border-radius": "10px",
          },
        },
        ["responsive"]
      );
    },
  ],
};
