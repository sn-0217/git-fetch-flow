
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000, // Fixed to use port 8080
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Your Spring Boot backend
        changeOrigin: true,
        secure: false,
      },
      '/admin': {
        target: 'http://localhost:8080', // Your Spring Boot backend
        changeOrigin: true,
        secure: false,
      },
      '/logout': {
        target: 'http://localhost:8080', // Your Spring Boot backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
