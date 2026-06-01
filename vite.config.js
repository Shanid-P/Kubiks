import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  base: "./", // IMPORTANT for deployment

  worker: {
    format: "es",
    // Ensure CJS packages like cubejs are transformed inside the worker bundle
    rollupOptions: {
      plugins: [],
    },
  },

  optimizeDeps: {
    include: ["cubejs"],
  },

  build: {
    commonjsOptions: {
      include: [/cubejs/, /node_modules/],
      transformMixedEsModules: true,
    },
  },
})


