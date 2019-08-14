import vue from 'rollup-plugin-vue'
import serve from 'rollup-plugin-serve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import htmlTemplate from 'rollup-plugin-generate-html-template'

export default {
  input:
    process.env.BUILD === 'dev' || process.env.BUILD === 'demo'
      ? 'src/demo.ts'
      : 'src/wrapper.ts',
  output: {
    name: 'Mapbox',
    exports: 'named',
    globals: {
      vue: 'Vue',
      'mapbox-gl': 'mapboxgl',
    },
  },
  plugins: [
    resolve(),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true,
    }),
    typescript({ clean: true }),
    ...(process.env.BUILD === 'prod' || process.env.BUILD === 'demo'
      ? [terser()]
      : []),
    ...(process.env.BUILD === 'demo' || process.env.BUILD === 'dev'
      ? [
          htmlTemplate({
            template: 'src/index.html',
            target: 'index.html',
          }),
          replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.VUE_ENV': JSON.stringify('browser'),
          }),
        ]
      : []),
    ...(process.env.BUILD === 'dev' ? [serve('dist')] : []),
  ],
  external: process.env.BUILD === 'prod' ? ['vue', 'mapbox-gl'] : [],
}
