import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: { "process.env": { productName: "LipWebUI" } },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://api.lippkg.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        //因为服务器是不存在api字段的，这里需要去除
      },
    },
  },
});
