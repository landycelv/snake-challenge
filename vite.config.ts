import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  base: './', // 相对路径，适配 Gitee Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // 生产环境不生成 source map
    minify: 'terser', // 使用 terser 压缩
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console.log
        drop_debugger: true, // 移除 debugger
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // 代码分割优化
          vendor: ['snake-challenge'],
        },
        // 资源文件名添加 hash 用于缓存
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
    // 启用 gzip 压缩
    cssCodeSplit: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  // 优化构建性能
  optimizeDeps: {
    include: [],
  },
})
