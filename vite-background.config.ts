import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    build:{
        emptyOutDir: false,
        target:"node16",
        rollupOptions:{
        input:{
            background: "./background/background.ts",
        },
        output:{
            entryFileNames: "assets/[name].js"
        }
        },
    },
})
