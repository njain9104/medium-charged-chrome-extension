import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    target:"esnext",
    rollupOptions:{
      input:{
        popup: "./popup/index.html",
        "content-script": "./content_script/content-script.ts",
        main: "./content_script/main.ts"
      },
      output:{
        entryFileNames: "assets/[name].js"
      }
    },
  },
})
