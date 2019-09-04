const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/demo.ts'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'demo.min.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),
    new webpack.ProvidePlugin({
      mapboxgl: 'mapbox-gl',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ACCESS_TOKEN: JSON.stringify(process.env.ACCESS_TOKEN),
      },
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    port: 8080,
    hot: true,
  },
}
