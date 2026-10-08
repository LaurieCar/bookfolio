import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Le proxy : tout ce qui commence par /api est envoyé au serveur Express
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
