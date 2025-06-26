import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(),
    dts({
      // 自定义输出目录
      outDir: 'dist/types',
      // 是否为 `index.ts` 生成单独的声明文件
      insertTypesEntry: true,
      entryRoot: resolve(__dirname, 'src/components'),
      // exclude: ['pages/**'],
      // include: [resolve(__dirname, 'src/plugins')]
    }),
  ],
  server: {
    port: 5174
  },
  build: {
    lib: {
      entry:  resolve(__dirname, 'src/components/index.ts'),
      name: 'FormkitElementPlus',
      fileName: 'formkit-element-plus',
      formats: ['es']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue',"@formkit/vue","element-plus","@formkit/core","@formkit/inputs"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
