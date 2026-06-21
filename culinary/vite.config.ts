import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plain client-side SPA. No backend, no env secrets required.
export default defineConfig({
  plugins: [react()],
})
