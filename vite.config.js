import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
// Prism
import prismjs from 'vite-plugin-prismjs';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        prismjs({
            languages: ['json','json','python','java','c','powershell'],
        }),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),

    ],
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
