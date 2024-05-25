import { resolve } from "node:path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      input: {
        //vis: resolve(__dirname, "vis/index.html"),
        settings: resolve(__dirname, "settings/index.html")
      }
    }
  }
})
