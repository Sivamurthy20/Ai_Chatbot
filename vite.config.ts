import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base:'/Ai_Chatbot',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
