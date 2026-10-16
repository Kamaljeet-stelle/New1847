import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactNativeWeb from 'vite-plugin-react-native-web';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

/** Turn Metro-style require('./x.jpg') into RN Image-friendly { uri } for Vite. */
function rnAssetRequire() {
  const pattern =
    /require\(\s*(['"`][^'"`]+\.(?:png|jpe?g|gif|webp|svg|ttf|otf)['"`])\s*\)/g;
  return {
    name: 'rn-asset-require',
    enforce: 'pre',
    transform(code, id) {
      if (!/\.[jt]sx?$/.test(id) || id.includes('node_modules')) {
        return null;
      }
      if (!pattern.test(code)) {
        return null;
      }
      pattern.lastIndex = 0;
      return {
        code: code.replace(
          pattern,
          '{ uri: new URL($1, import.meta.url).href }',
        ),
        map: null,
      };
    },
  };
}

export default defineConfig({
  plugins: [
    rnAssetRequire(),
    react({
      babel: {
        babelrc: false,
        configFile: false,
        presets: ['@babel/preset-react'],
      },
    }),
    reactNativeWeb(),
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-dom/client': path.resolve(root, 'web/react-dom-client.js'),
      'react-dom-client-impl': path.resolve(
        root,
        'node_modules/react-dom/client.js',
      ),
    },
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.json',
    ],
  },
  define: {
    global: 'window',
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      allow: [root],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
      resolveExtensions: [
        '.web.js',
        '.web.ts',
        '.web.tsx',
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
      ],
    },
    include: [
      'react',
      'react/jsx-runtime',
      'react-dom',
      'react-dom-client-impl',
      'react-native-web',
      'react-native-gesture-handler',
      'react-native-safe-area-context',
      'react-native-screens',
      'react-native-toast-message',
      '@react-navigation/native',
      '@react-navigation/native-stack',
      '@react-navigation/bottom-tabs',
    ],
    needsInterop: ['react-dom', 'react-dom-client-impl'],
  },
  assetsInclude: ['**/*.ttf', '**/*.otf'],
});
