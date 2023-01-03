import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
import react from "@vitejs/plugin-react-swc"; // only use this in development, because this fast

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            jsxImportSource: "@welldone-software/why-did-you-render", // <----- disable in production
        }),
    ],
});
