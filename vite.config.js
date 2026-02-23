import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: './', // Use relative paths for assets so Github Pages branch works anywhere
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        physical: './physical.html',
        academic: './academic.html',
        mental: './mental.html',
        mortality: './mortality.html',
      }
    }
  }
})
