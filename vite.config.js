import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/scss/var.scss";'
      }
    }
  },
  resolve: {
    alias: {
      // 关键代码
      '@': path.resolve(__dirname, './src')
    }
  },
})
