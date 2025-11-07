import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    hot: true,
    cors: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        profile: path.resolve(__dirname, 'profile.html'),
        orders: path.resolve(__dirname, 'orders.html'),
        messages: path.resolve(__dirname, 'messages.html'),
        signin: path.resolve(__dirname, 'sign-in.html')
      }
    }
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@services': path.resolve(__dirname, './src/services'),
      '@api': path.resolve(__dirname, './src/services/api')
    }
  }
});
