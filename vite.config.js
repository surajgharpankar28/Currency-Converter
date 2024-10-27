import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "replace-process-env",
      // Use the "transform" hook to replace process.env variables
      transform(code) {
        return code.replace(
          /process\.env\.VITE_API_KEY/g,
          JSON.stringify(process.env.VITE_API_KEY)
        );
      },
    },
  ],
});
