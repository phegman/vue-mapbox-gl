import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/wrapper.ts',
  output: {
    file: 'dist/vue-mapbox-gl.umd.js',
    format: 'umd',
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
    terser(),
  ],
  external: ['vue', 'mapbox-gl'],
}
