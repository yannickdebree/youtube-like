import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [vue()],
    root: 'pwa',
    server: { host: '0.0.0.0', port: +process.env['PWA_PORT'] },
    build: { outDir: '../dist/pwa' },
})
