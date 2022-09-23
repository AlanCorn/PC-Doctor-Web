import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// Prism
import prismjs from 'vite-plugin-prismjs';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        prismjs({
            languages: ['json','json','python','java','c','powershell'],
        }),],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./src/style/scss/var.scss";'
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
