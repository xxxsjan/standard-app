import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 会在根目录生成auto-imports.d.ts，里面可以看到自动导入的api
      dts: true,
      // 匹配的文件，也就是哪些后缀的文件需要自动引入
      include: [/\.[tj]sx?$/, /\.vue$/],
      // 自动引入的api从这里找
      imports: [
        'vue',
        'vue-router',
        // 详细配置
        {
          '@vueuse/core': [
            // named imports
            'useMouse', // import { useMouse } from '@vueuse/core',
            // alias
            ['useFetch', 'useMyFetch'] // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          axios: [
            // default imports
            ['default', 'axios'] // import { default as axios } from 'axios',
          ]
        }
      ],
      // 解析器配置
      resolvers: [], // 第三方ui
      // 根据项目情况配置eslintrc，默认是不开启的
      eslintrc: {
        enabled: true // @default false
        // 下面两个是其他配置，默认即可
        // 输出一份json文件，默认输出路径为./.eslintrc-auto-import.json
        // filepath: './.eslintrc-auto-import.json', // @default './.eslintrc-auto-import.json'
        // globalsPropValue: true, // @default true 可设置 boolean | 'readonly' | 'readable' | 'writable' | 'writeable'
      }
    })
  ]
});
