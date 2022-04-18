import { defineConfig } from 'vite';
import { PWA_PORT } from './utils';

export default defineConfig({
    root: 'pwa',
    server: { port: +PWA_PORT, host: '0.0.0.0' }
})