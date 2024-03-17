import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    emptyOutDir: false,
    rollupOptions:{
      input:{
        content: "./content_script/content-script.ts",
        "content-main": "./content_script/main.ts",
      },
      output:{
        entryFileNames: "assets/[name].js"
      }
    },
  },
})
