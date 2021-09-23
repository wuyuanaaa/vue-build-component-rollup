import pkg from './package.json'
import NodeResolve  from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import PluginVue from "rollup-plugin-vue"
import { terser } from 'rollup-plugin-terser'

const name = 'ViewLoading'
const globals = {
  'vue': 'Vue'
}

export default {
  input: 'src/index.js',
  output: [
    {
      name,
      file: pkg.main,
      format: 'umd',
      globals
    },
    {
      name,
      file: 'dist/vue-view-loading.umd.min.js',
      format: 'umd',
      globals,
      plugins: [terser()]
    },
    {
      name,
      file: pkg.module,
      format: 'es',
      globals
    },
    {
      name: 'vueQrCode',
      file: 'dist/vue-view-loading.es.min.js',
      format: 'es',
      globals,
      plugins: [terser()]
    }
  ],
  plugins: [
    NodeResolve(),
    PluginVue(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude:'node_modules/**'
    }),
    postcss({
      extensions:['.css','.less', '.scss']
    })
  ],
  external: ['vue']
}