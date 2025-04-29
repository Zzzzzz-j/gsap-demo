import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import fs from 'fs';
// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
//自定义svg相关插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

function resolvePath(paths: string) {
  return path.resolve(__dirname, paths);
}

function readFolder(entryPath: string, callback: any) {
  // 递归读取入口文件夹下的所有文件地址
  const files = fs.readdirSync(path.resolve(__dirname, entryPath));
  files.forEach(file => {
    const filePath = path.resolve(__dirname, `${entryPath}/${file}`); // 文件的绝对路径
    const stat = fs.lstatSync(filePath);
    if (stat.isDirectory()) {
      // 是文件夹
      readFolder(filePath, callback);
    } else {
      callback(entryPath, file);
    }
  });
}
// 获取文件后缀名
function getExtname(allPath: string) {
  return path.extname(allPath);
}
const additionalData = (function () {
  let resources = '@use "sass:math";\n'; // 将 @use 放在最前面
  const styleFolderPath = path.resolve(__dirname, './src/styles/variable');
  readFolder(styleFolderPath, (filePath: string, file: any) => {
    const allPath = `@import "@styles/variable/${file}`;
    const extname = getExtname(allPath);
    if (extname === '.scss') {
      resources += `${allPath}";\n`; // setting放在前面
    }
  });
  return resources;
})();

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
			//安装两行后你会发现在组件中不用再导入ref，reactive等
			imports: ['vue', 'vue-router', 'pinia'],
      //存放的位置
			dts: "src/auto-import.d.ts",
		}),
		Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
      // 忽略组件名重复警告
      directoryAsNamespace: true,
			// 引入组件的,包括自定义组件
      // 存放的位置
      dts: "src/components.d.ts",
		}),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [
        path.resolve(process.cwd(), 'src/assets/svg'),
      ],
      // 指定symbolId格式
      symbolId: 'icon-[name]',
      // inject: 'body-last' | 'body-first',
      inject: 'body-last',
      customDomId: '__svg__icons__dom__',
    }),
  ],
  resolve: {
    // 设置别名
    alias: {
      '@': resolvePath('src'),
      '@views/': resolvePath('src/views'),
      '@comps': resolvePath('./src/components'),
      '@imgs': resolvePath('./src/assets/img'),
      '@icons': resolvePath('./src/assets/icons'),
      '@utils': resolvePath('./src/utils'),
      '@stores': resolvePath('./src/store'),
      '@plugins': resolvePath('./src/plugins'),
      '@styles': resolvePath('./src/styles'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData,
      },
    },
  },
  server: {
    hmr: true,
    // usePolling: true,
    port: 5003,
    host: true,
    open: true,
    fs: {
      strict: false,
    },
    cors: true,
    proxy: {},
  },
})
