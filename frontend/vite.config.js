import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // Trigger Vite restart to pick up new PostCSS config
    server: {
        watch: {
            usePolling: true
        }
    }
})
