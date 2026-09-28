import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { taskCsvPlugin } from './server/taskCsv';

export default defineConfig({
  plugins: [taskCsvPlugin(), react(), tailwindcss()],
  server: { port: 4310, strictPort: true },
  preview: { port: 4310, strictPort: true },
});
