/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/line-clamp"),
        require("daisyui"),
    ],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        borderWidth: {
            DEFAULT: "1px",
            0: "0",
            2: "2px",
            3: "3px",
            4: "4px",
            6: "6px",
            8: "8px",
        },
        extend: {
            screens: {
                xl: "1920px",
            },
            fontFamily: {
                sans: ["Roboto", ...defaultTheme.fontFamily.sans],
                inter: [
                    "Inter",
                    "Roboto",
                    ...defaultTheme.fontFamily.sans,
                ],
                condensed: [
                    "Roboto Condensed",
                    "Roboto",
                    ...defaultTheme.fontFamily.sans,
                ],
            },
            boxShadow: {
                "3xl": "0px 4px 100px rgba(0, 0, 0, 0.85);",
            },
            fontSize: {
                "7.25xl": "4.75rem",
            },
            colors: {
                neutral: {
                    100: "#FFFFFF",
                    200: "#7F8A9D",
                    300: "#333C48",
                    400: "#1B1E26",
                    500: "#121417",
                    600: "#0C0C0C",
                },
                primary: {
                    DEFAULT: "#4379fb",
                    50: "#eff5ff",
                    100: "#dae7ff",
                    200: "#bdd5ff",
                    300: "#90bbff",
                    400: "#5c97fe",
                    500: "#4379fb",
                    600: "#204ff0",
                    700: "#183bdd",
                    800: "#1a31b3",
                    900: "#1b2f8d",
                },
                danger: {
                    DEFAULT: "#f25349",
                    50: "#fef3f2",
                    100: "#fee4e2",
                    200: "#ffccc9",
                    300: "#fda9a4",
                    400: "#fa776f",
                    500: "#f25349",
                    600: "#df2e23",
                    700: "#bb241a",
                    800: "#9b2119",
                    900: "#80221c",
                },
                success: {
                    DEFAULT: "#259e64",
                    50: "#eefbf3",
                    100: "#d6f5e0",
                    200: "#b1e9c7",
                    300: "#7ed7a7",
                    400: "#49be82",
                    500: "#259e64",
                    600: "#188352",
                    700: "#136943",
                    800: "#125337",
                    900: "#0f452f",
                },
                "biloba-flower": {
                    DEFAULT: "#b887e8",
                    50: "#faf6fe",
                    100: "#f3ebfc",
                    200: "#e9dbf9",
                    300: "#d8bff3",
                    400: "#b887e8",
                    500: "#a86ce0",
                    600: "#934dd0",
                    700: "#7d3bb5",
                    800: "#693495",
                    900: "#562b78",
                },
                spray: {
                    DEFAULT: "#88dff3",
                    50: "#edfcfe",
                    100: "#d2f5fb",
                    200: "#aaeaf7",
                    300: "#88dff3",
                    400: "#2ebde2",
                    500: "#12a1c8",
                    600: "#1280a8",
                    700: "#166888",
                    800: "#1b556f",
                    900: "#1a475f",
                },
                "pale-prim": {
                    DEFAULT: "#fcfcbe",
                    50: "#fdfde9",
                    100: "#fcfcbe",
                    200: "#fbf68d",
                    300: "#f8eb4c",
                    400: "#f3da1c",
                    500: "#e4c20e",
                    600: "#c4980a",
                    700: "#9d6d0b",
                    800: "#825711",
                    900: "#6e4715",
                },
            },
            animation: {
                "ping-once": "ping 1s cubic-bezier(0, 0, 0.2, 1)",
            },
        },
        backgroundImage: {
            "grad-1":
                "linear-gradient(180deg, #121417 0%, #171A20 100%)",
            "grad-2":
                "radial-gradient(100% 180.71% at 0% -80.71%, #181818 0%, rgba(57, 57, 57, 0) 60.46%, rgba(95, 62, 62, 0.01) 100%)",
            "grad-3":
                "radial-gradient(100% 180.71% at 0% -80.71%, #181818 0%, rgba(41, 41, 41, 0) 60.46%, rgba(95, 62, 62, 0.01) 100%)",
            "grad-4":
                "radial-gradient(79.14% 41.08% at 16.06% -9.96%, rgba(255, 255, 255,0.135) 21.28%, rgba(255, 255, 255, 0) 100%)",
        },
    },
};
